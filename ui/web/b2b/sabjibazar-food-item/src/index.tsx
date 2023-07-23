import {createRoot} from 'react-dom/client'

const Main=()=>{
    return <div>Hello Typescirpt</div>
}



document.body.innerHTML='<div id="app"> </div>';

const domnode = document.getElementById("app");
const root = createRoot(domnode);
console.log("roote",root);

root.render(<Main/>)