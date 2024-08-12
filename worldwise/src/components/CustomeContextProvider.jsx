import { useContext, useState } from "react";
import { createContext } from "react";

// 1/ create context
const PostContext = createContext();

function CustomContextProvider() {
    // 2/ create state , this is just example
    const [testData, setTestData] = useState('');
    const [testData2, setTestData2] = useState(0);

    // 3/ crate functions if needed
    function testFunction() {
        console.log("test");
    }
    // 4/ return provider to be used
    return (
        <PostContext.Provider
            value={
                {
                    testData,
                    setTestData,
                    testData2,
                    setTestData2,
                    testFunction,
                }
            }
        >

        </PostContext.Provider>
    );
}
// 5/ do export and then use it
// export { CustomContextProvider, PostContext }

// 6/ you can export a function as well, even better because it is a custom hook
function usePosts() {
    const context = useContext(PostContext);
    return context;
}

export { CustomContextProvider, usePosts };