

<!-- for editing
on checkbox true, open input and accept description -->
# data-control


- data-control
    - update UI
        - get datasource.data lists
        - for each record, get value and recordToUpdate.push(currentValue)
            ```js
            {
               id: 1,
               recordValue (or just "value"): "get cucumber" 
            } 
            ```


```js
class loadComponents(id, target) {
    createElement("template");
    html = getHTML(id); //fetch?
    template.innerHTML = html;
    target.appendChild(template)
}
```


//create datasource.json list
// data-source loadComponent into DOM
// data-control component -> fetch data
// pass that to index.updateUI
// updateUI -> create list-item and add to DOM


    <data-control data-url="http://somewhere" element="list"></data-control>

        const data = fetch(dataset.url)
         list.data = data
        forof data {
             list.appendchild(list-item)
        }

