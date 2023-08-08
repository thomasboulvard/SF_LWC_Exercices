    const showToast = (title, message, variant) => {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        dispatchEvent(event);
    };

    export { showToast };