package com.password.manager.core.db.encrypt;


import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AESEncryptionService {

    private final KeyGenerator keyGenerator;

    private final static String algorithm = "AES/CBC/PKCS5Padding";

    @SneakyThrows
    public String encrypt(UUID uuid, String input, String masterKey) {
        SecretKey fromPassword = keyGenerator.getKeyFromPassword(masterKey, uuid.toString());
        Cipher cipher = Cipher.getInstance(algorithm);

        cipher.init(Cipher.ENCRYPT_MODE, fromPassword, generateIv());
        byte[] encoded = cipher.doFinal(input.getBytes());

        return Base64.getEncoder()
                .encodeToString(encoded);
    }

    @SneakyThrows
    public String decrypt(UUID uuid, String encodedData, String masterKey) {
        Cipher cipher = Cipher.getInstance(algorithm);

        SecretKey fromPassword = keyGenerator.getKeyFromPassword(masterKey, uuid.toString());

        cipher.init(Cipher.DECRYPT_MODE, fromPassword, generateIv());

        byte[] plainText = cipher.doFinal(Base64.getDecoder()
                .decode(encodedData));

        return new String(plainText);
    }

    public IvParameterSpec generateIv() {
        return new IvParameterSpec(new byte[16]);
    }
}
