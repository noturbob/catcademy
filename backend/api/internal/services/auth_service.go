package services

import (
	"errors"
	"time"

	"github.com/agony/catcademy-api/internal/models"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	jwtSecret         string
	expiryHours       int
	refreshExpiryDays int
}

type Claims struct {
	UserID string `json:"userId"`
	Email  string `json:"email"`
	IsPro  bool   `json:"isPro"`
	jwt.RegisteredClaims
}

func NewAuthService(jwtSecret string, expiryHours, refreshExpiryDays int) *AuthService {
	return &AuthService{
		jwtSecret:         jwtSecret,
		expiryHours:       expiryHours,
		refreshExpiryDays: refreshExpiryDays,
	}
}

func (s *AuthService) HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash), err
}

func (s *AuthService) CheckPassword(hash, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}

func (s *AuthService) GenerateAccessToken(user *models.User) (string, error) {
	claims := &Claims{
		UserID: user.ID.String(),
		Email:  user.Email,
		IsPro:  user.IsPro,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * time.Duration(s.expiryHours))),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.jwtSecret))
}

func (s *AuthService) ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(s.jwtSecret), nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
