/* ------------------------------------------------------------------------------
@name: Regex
@description: Regex
--------------------------------------------------------------------------------- */

export const WHITESPACE = /^\s*$/;
export const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i;
export const NUMBERIC = /^[0-9]+$/;
export const PHONE_NUMBER = /^(\+62|0)[0-9]{4,16}$/;
export const FULL_NAME = /^[\p{L}.'\- ]{3,}$/u;
export const PERSON_NAME = /^[\p{L}][\p{L}\s\-'\.]*$/u;
