package response

import "github.com/gin-gonic/gin"

type APIResponse struct {
Success bool        `json:"success"`
Data    interface{} `json:"data,omitempty"`
Error   *APIError   `json:"error,omitempty"`
Meta    *Meta       `json:"meta,omitempty"`
}

type APIError struct {
Code    string `json:"code"`
Message string `json:"message"`
}

type Meta struct {
Total  int `json:"total,omitempty"`
Limit  int `json:"limit,omitempty"`
Offset int `json:"offset,omitempty"`
}

func OK(c *gin.Context, data interface{}) {
c.JSON(200, APIResponse{Success: true, Data: data})
}

func OKWithMeta(c *gin.Context, data interface{}, meta Meta) {
c.JSON(200, APIResponse{Success: true, Data: data, Meta: &meta})
}

func Created(c *gin.Context, data interface{}) {
c.JSON(201, APIResponse{Success: true, Data: data})
}

func BadRequest(c *gin.Context, code, message string) {
c.JSON(400, APIResponse{Success: false, Error: &APIError{Code: code, Message: message}})
}

func Unauthorized(c *gin.Context) {
c.JSON(401, APIResponse{Success: false, Error: &APIError{Code: "UNAUTHORIZED", Message: "Authentication required"}})
}

func Forbidden(c *gin.Context) {
c.JSON(403, APIResponse{Success: false, Error: &APIError{Code: "FORBIDDEN", Message: "You do not have permission to perform this action"}})
}

func NotFound(c *gin.Context, resource string) {
c.JSON(404, APIResponse{Success: false, Error: &APIError{Code: "NOT_FOUND", Message: resource + " not found"}})
}

func InternalError(c *gin.Context, err error) {
c.JSON(500, APIResponse{Success: false, Error: &APIError{Code: "INTERNAL_ERROR", Message: "Something went wrong"}})
}

func TooManyRequests(c *gin.Context, message string) {
c.JSON(429, APIResponse{Success: false, Error: &APIError{Code: "RATE_LIMITED", Message: message}})
}
