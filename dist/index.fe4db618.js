let React = {
    createElement: (tag, props, ...children)=>{
        if (typeof tag == "function") try {
            return tag(props);
        } catch ({ promise , key  }) {
            promise.then((data)=>{
                console.log(promise);
                promiseCache.set(key, data);
                rerender();
            });
            return {
                tag: 'h1',
                props: {
                    children: [
                        'I AM LOADING'
                    ]
                }
            };
        }
        var element = {
            tag,
            props: {
                ...props,
                children
            }
        };
        //    console.log( element );
        return element;
    }
};
const promiseCache = new Map();
const createResouce = (thingThatReturnsSomething, key)=>{
    if (promiseCache.has(key)) return promiseCache.get(key);
    throw {
        promise: thingThatReturnsSomething(),
        key
    };
};
const App = ()=>{
    const [name, setName] = useState("person");
    const [count, setCount] = useState(0);
    const dogPhotoUrl = createResouce(()=>fetch("https://dog.ceo/api/breeds/image/random").then((r)=>r.json()
        ).then((payload)=>payload.message
        )
    , 'dogPhoto');
    return(/*#__PURE__*/ React.createElement("div", {
        className: "react-2020",
        __source: {
            fileName: "index.tsx",
            lineNumber: 39,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("h1", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 40,
            columnNumber: 9
        },
        __self: this
    }, "Hello, ", name, "!"), /*#__PURE__*/ React.createElement("input", {
        value: name,
        onchange: (e)=>setName(e.target.value)
        ,
        type: "text",
        placeholder: "name",
        __source: {
            fileName: "index.tsx",
            lineNumber: 41,
            columnNumber: 9
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("h2", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 42,
            columnNumber: 9
        },
        __self: this
    }, "The count is: ", count), dogPhotoUrl, /*#__PURE__*/ React.createElement("button", {
        onclick: ()=>setCount(count + 1)
        ,
        __source: {
            fileName: "index.tsx",
            lineNumber: 44,
            columnNumber: 9
        },
        __self: this
    }, "+"), /*#__PURE__*/ React.createElement("button", {
        onclick: ()=>setCount(count - 1)
        ,
        __source: {
            fileName: "index.tsx",
            lineNumber: 45,
            columnNumber: 9
        },
        __self: this
    }, "-"), /*#__PURE__*/ React.createElement("p", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 46,
            columnNumber: 9
        },
        __self: this
    }, "Yes")));
};
const states = [];
let stateCursor = 0;
const useState = (initialState)=>{
    const FROZENCURSOR = stateCursor;
    states[FROZENCURSOR] = states[FROZENCURSOR] || initialState;
    console.log(states);
    const setState = (newState)=>{
        states[FROZENCURSOR] = newState;
        rerender();
    };
    stateCursor++;
    return [
        states[FROZENCURSOR],
        setState
    ];
};
const renderer = (reactElement, container)=>{
    if ([
        'string',
        'number'
    ].includes(typeof reactElement)) {
        container.appendChild(document.createTextNode(String(reactElement)));
        return;
    }
    const actualDomElement = document.createElement(reactElement.tag);
    if (reactElement.props) Object.keys(reactElement.props).filter((p)=>p != 'children'
    ).forEach((p)=>actualDomElement[p] = reactElement.props[p]
    );
    if (reactElement.props.children) reactElement.props.children.forEach((child)=>renderer(child, actualDomElement)
    );
    container.appendChild(actualDomElement);
};
const rerender = ()=>{
    stateCursor = 0;
    document.querySelector("#app").firstChild.remove();
    renderer(/*#__PURE__*/ React.createElement(App, {
        __source: {
            fileName: "index.tsx",
            lineNumber: 88,
            columnNumber: 14
        },
        __self: this
    }), document.querySelector('#app'));
};
renderer(/*#__PURE__*/ React.createElement(App, {
    __source: {
        fileName: "index.tsx",
        lineNumber: 91,
        columnNumber: 10
    },
    __self: this
}), document.querySelector('#app'));

//# sourceMappingURL=index.fe4db618.js.map
