package crypto

import (
"crypto/aes"
"crypto/cipher"
"crypto/rand"
"encoding/hex"
"fmt"
"io"
)

func Encrypt(plaintext string, key string) (string, error) {
// Ensure key is 32 bytes for AES-256
keyBytes := make([]byte, 32)
copy(keyBytes, []byte(key))

block, err := aes.NewCipher(keyBytes)
if err != nil {
return "", err
}

gcm, err := cipher.NewGCM(block)
if err != nil {
return "", err
}

nonce := make([]byte, gcm.NonceSize())
if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
return "", err
}

ciphertext := gcm.Seal(nonce, nonce, []byte(plaintext), nil)
return hex.EncodeToString(ciphertext), nil
}

func Decrypt(ciphertext string, key string) (string, error) {
// Ensure key is 32 bytes for AES-256
keyBytes := make([]byte, 32)
copy(keyBytes, []byte(key))

ciphertextBytes, err := hex.DecodeString(ciphertext)
if err != nil {
return "", err
}

block, err := aes.NewCipher(keyBytes)
if err != nil {
return "", err
}

gcm, err := cipher.NewGCM(block)
if err != nil {
return "", err
}

nonceSize := gcm.NonceSize()
if len(ciphertextBytes) < nonceSize {
return "", fmt.Errorf("ciphertext too short")
}

nonce, ciphertext2 := ciphertextBytes[:nonceSize], ciphertextBytes[nonceSize:]
plaintext, err := gcm.Open(nil, nonce, ciphertext2, nil)
if err != nil {
return "", err
}

return string(plaintext), nil
}
