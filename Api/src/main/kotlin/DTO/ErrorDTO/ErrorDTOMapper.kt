package twitter.model.DTO.ErrorDTO

import io.javalin.validation.ValidationException

class ErrorDTOMapper {

    fun ValidationErrorToDTO(error: ValidationException) : ValidationErrorDTO{
        var allErrors = mutableListOf<String>()
        error.errors.get("REQUEST_BODY")?.forEach { allErrors.add(it.message) }
        return ValidationErrorDTO(allErrors)
    }
}