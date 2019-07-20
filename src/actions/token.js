export const TOKEN_SUCESS = 'TOKEN_SUCESS';
export const TOKEN_ERROR = 'TOKEN_ERROR';

export function setTokenSucess(sucessToken, token, user) {
    return {
      type: TOKEN_SUCESS,
      payload: { 
        sucessToken,
        token,
        user
      }
    }
  }
  
  export function setTokenError(errorToken) {
    return {
      type: TOKEN_ERROR,
      payload: { 
        errorToken,
      }
    }
  }