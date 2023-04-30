const listeners: Record<string, Function> = {}

function callEvent(eventName: string, ...args: any[]) {
    // If no any listener added
    if (!listeners[eventName]) return;

    listeners[eventName](...args);
}

function addEvent(eventName: string, callback: Function) {
    listeners[eventName] = callback;
}

export const EventBus = {
    $emit: callEvent,
    $on: addEvent,
};
