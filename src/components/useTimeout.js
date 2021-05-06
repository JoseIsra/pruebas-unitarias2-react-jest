import { useEffect, useCallback, useRef} from 'react';

const useTimeout = (callback, ms)=> {

    const timeOutIdRef = useRef();
    const cancel = useCallback(() => {
            const timeoutId = timeOutIdRef.current;
            if(timeoutId) {
                timeOutIdRef.current = undefined;
                clearTimeout(timeoutId);
            }
    }, [timeOutIdRef]);

    useEffect(() => {
        timeOutIdRef.current = setTimeout(callback, ms);

        return cancel
    }, [callback, ms, cancel]);
        return cancel;
}

export default useTimeout;