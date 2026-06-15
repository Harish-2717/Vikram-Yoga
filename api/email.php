<?php
// Ensure environment variables are loaded if not already
if (!function_exists('loadEnv')) {
    function loadEnv($path) {
        if (!file_exists($path)) {
            return;
        }
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || strpos($line, '#') === 0) {
                continue;
            }
            if (strpos($line, '=') !== false) {
                list($name, $value) = explode('=', $line, 2);
                $name = trim($name);
                $value = trim($value);
                $value = trim($value, '"\'');
                if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                    putenv("{$name}={$value}");
                    $_ENV[$name] = $value;
                    $_SERVER[$name] = $value;
                }
            }
        }
    }
}
loadEnv(__DIR__ . '/../.env');

function sendEmail($to, $subject, $html) {
    $host = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
    $port = intval(getenv('SMTP_PORT') ?: '587');
    $user = getenv('SMTP_USER') ?: 'fahmidhaafra@gmail.com';
    $pass = getenv('SMTP_PASS') ?: 'rmep wpjy bctf jmfa';
    $fromName = "Dr. Vikram Yoga & Wellness Centre";

    try {
        $socket = fsockopen($host, $port, $errno, $errstr, 15);
        if (!$socket) {
            throw new Exception("Could not connect to SMTP host: $errstr ($errno)");
        }

        // Read greeting
        fgets($socket, 515);

        // EHLO
        fwrite($socket, "EHLO localhost\r\n");
        $response = "";
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) === " ") break;
        }

        // STARTTLS
        if ($port === 587) {
            fwrite($socket, "STARTTLS\r\n");
            $res = fgets($socket, 515);
            if (substr($res, 0, 3) !== "220") {
                throw new Exception("STARTTLS failed: $res");
            }

            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new Exception("Failed to enable TLS encryption");
            }

            // EHLO again
            fwrite($socket, "EHLO localhost\r\n");
            $response = "";
            while ($line = fgets($socket, 515)) {
                $response .= $line;
                if (substr($line, 3, 1) === " ") break;
            }
        }

        // AUTH LOGIN
        fwrite($socket, "AUTH LOGIN\r\n");
        $res = fgets($socket, 515);
        if (substr($res, 0, 3) !== "334") {
            throw new Exception("AUTH LOGIN failed: $res");
        }

        fwrite($socket, base64_encode($user) . "\r\n");
        $res = fgets($socket, 515);
        if (substr($res, 0, 3) !== "334") {
            throw new Exception("Username authentication failed: $res");
        }

        fwrite($socket, base64_encode($pass) . "\r\n");
        $res = fgets($socket, 515);
        if (substr($res, 0, 3) !== "235") {
            throw new Exception("Password authentication failed: $res");
        }

        // MAIL FROM
        fwrite($socket, "MAIL FROM: <{$user}>\r\n");
        fgets($socket, 515);

        // RCPT TO
        fwrite($socket, "RCPT TO: <{$to}>\r\n");
        $res = fgets($socket, 515);
        if (substr($res, 0, 3) !== "250" && substr($res, 0, 3) !== "251") {
            throw new Exception("Recipient rejected: $res");
        }

        // DATA
        fwrite($socket, "DATA\r\n");
        $res = fgets($socket, 515);
        if (substr($res, 0, 3) !== "354") {
            throw new Exception("DATA initiation failed: $res");
        }

        // Message Headers & Body
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$user}>\r\n";
        $headers .= "To: <{$to}>\r\n";
        $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $headers .= "Date: " . date("r") . "\r\n";
        $headers .= "Message-ID: <" . uniqid() . "@localhost>\r\n";

        fwrite($socket, $headers . "\r\n" . $html . "\r\n.\r\n");
        $res = fgets($socket, 515);
        if (substr($res, 0, 3) !== "250") {
            throw new Exception("Failed to send message content: $res");
        }

        // QUIT
        fwrite($socket, "QUIT\r\n");
        fclose($socket);

        return ["success" => true];
    } catch (Exception $e) {
        return ["success" => false, "error" => $e->getMessage()];
    }
}
