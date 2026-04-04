package middleware

import (
"strings"

"github.com/gin-gonic/gin"
"github.com/agony/catalyst-api/internal/services"
"github.com/agony/catalyst-api/pkg/response"
)

func AuthRequired(authService *services.AuthService) gin.HandlerFunc {
return func(c *gin.Context) {
authHeader := c.GetHeader("Authorization")
if authHeader == "" {
response.Unauthorized(c)
c.Abort()
return
}

parts := strings.Split(authHeader, " ")
if len(parts) != 2 || parts[0] != "Bearer" {
response.Unauthorized(c)
c.Abort()
return
}

claims, err := authService.ValidateToken(parts[1])
if err != nil {
response.Unauthorized(c)
c.Abort()
return
}

c.Set("userID", claims.UserID)
c.Set("email", claims.Email)
c.Set("isPro", claims.IsPro)
c.Next()
}
}

func AuthOptional(authService *services.AuthService) gin.HandlerFunc {
return func(c *gin.Context) {
authHeader := c.GetHeader("Authorization")
if authHeader == "" {
c.Next()
return
}

parts := strings.Split(authHeader, " ")
if len(parts) != 2 || parts[0] != "Bearer" {
c.Next()
return
}

claims, err := authService.ValidateToken(parts[1])
if err == nil {
c.Set("userID", claims.UserID)
c.Set("email", claims.Email)
c.Set("isPro", claims.IsPro)
}

c.Next()
}
}
