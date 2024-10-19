export const isPublicKeyMissingError = ({ vapiError }) => {
    return !!vapiError && vapiError.error.statusCode === 403 && vapiError.error.error === "Forbidden";
  };
  

export const VAPI_KEY = "34bf4314-0f47-40d2-afa2-316ed5cc4826";

export const PRIVATE_VAPI_KEY = "3b9f9908-c81d-487f-9343-7bf868fc2e3e"