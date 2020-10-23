export const CLICK_NEXT = 'CLICK_NEXT';
export const CLICK_NEXT_RESET = 'CLICK_NEXT_RESET';

export function clickNext(){
    return {
        type: CLICK_NEXT,
    }
}

export function clickNextReset(){
    return {
        type: CLICK_NEXT_RESET
    }
}