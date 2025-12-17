/**
 * @typedef {{what: string, who1: string, shift1: string, who2?: string, shift2?: string}} PartialElf
 */
/**
 * @typedef {{idFor:string,labelTxt:string,tipus:string}} FormArr
 */

/**
 * @type {PartialElf[]}
 */
const arr = [
    {
        what: "Logisztika",
        who1: "Kovács Máté",
        shift1: "Délelöttös",
        who2: "Kovács József",
        shift2: "Délutános",
    },
    {
        what: "Könyvelés",
        who1: "Szabó Anna",
        shift1: "Éjszakai",
    },
    {
        what: "Játékfejlesztés",
        who1: "Varga Péter",
        shift1: "Délutános",
        who2: "Nagy Eszter",
        shift2: "Éjszakai",
    },
]

const jssection = document.createElement("div")
jssection.id = "jssection"
jssection.classList.add("hide")
document.body.appendChild(jssection)

generateTable("jstbody")
renderTableBody(arr)

/**
 * @type {FormArr[]}
 */
const arrForm = [
    {
        idFor:"osztaly",
        labelTxt:"Osztály",
        tipus:"input",
    },
    {
        idFor:"mano1",
        labelTxt:"Manó 1",
        tipus:"input",
    },
    {
        idFor:"muszak1",
        labelTxt:"Manó 1 műszak",
        tipus:"select",
    },
    {
        idFor:"masodikmano",
        labelTxt:"Két manót veszek fel",
        tipus:"checkbox",
    },
    {
        idFor:"mano2",
        labelTxt:"Manó 2",
        tipus:"input",
    },
    {
        idFor:"muszak2",
        labelTxt:"Manó 2 műszak",
        tipus:"select",
    }
]
const jsForm = createForm("jsform", arrForm)

//functions

/** 
 * @param {"th"|"td"} celltype
 * @param {string} cellcontent
 * @param {HTMLTableRowElement} parentrow
 * @returns {HTMLTableCellElement}
*/
function createTableCell(celltype, cellcontent, parentrow) {
    const cell = document.createElement(celltype)
    cell.innerText = cellcontent
    parentrow.appendChild(cell)
    return cell
}

/**
 * 
 * @param {string} tbodyid 
 */
function generateTable(tbodyid){
    const table = document.createElement("table")
    jssection.appendChild(table)

    const tbody = document.createElement("tbody")
    tbody.id = tbodyid
    table.appendChild(tbody)

    const thead = document.createElement("thead")
    table.appendChild(thead)

    const trh = document.createElement("tr")
    thead.appendChild(trh)

    for (const i of ["Osztály", "Manó", "Műszak"]){
        const th = document.createElement("th")
        th.innerText = i
        trh.appendChild(th)
    }
}

/**
 * @param {HTMLTableSectionElement} tablebody
 * @param {PartialElf} row
 */
function renderTableRow(tablebody, row) {
    const tr = document.createElement("tr")
    tablebody.appendChild(tr)

    const td1 = document.createElement("td")
    td1.innerText = row.what
    tr.appendChild(td1)

    createTableCell("td", row.who1, tr)
    createTableCell("td", row.shift1, tr)

    if (row.who2 && row.shift2) {
        td1.rowSpan = 2

        const tr2 = document.createElement("tr")
        tablebody.appendChild(tr2)

        createTableCell("td", row.who2, tr2)
        createTableCell("td", row.shift2, tr2)
    }
}

/**
 * 
 * @param {PartialElf[]} tomb 
 */
function renderTableBody(tomb) {
    const doby = document.getElementById("jstbody")
    doby.innerText = ""
    for (const i of tomb) {
        renderTableRow(doby, i)
    }
}

/**
 * 
 * @param {HTMLElement} parentElement 
 */
function breakLine(parentElement){
    const br = document.createElement("br")
    parentElement.appendChild(br)
}

/**
 * 
 * @param {HTMLElement} parentElement 
 * @param {string} variant 
 * @param {string} forName 
 * @param {string} Label 
 */
function createFormVariant(parentElement, variant, forName, Label){
    const div = document.createElement("div")
    parentElement.appendChild(div)

    const label = document.createElement("label")
    label.htmlFor = forName
    label.innerText = Label
    div.appendChild(label)

    if(variant == "input"){
        breakLine(div)
        const input = document.createElement("input")
        input.type = "text"
        input.id = forName
        div.appendChild(input)
        breakLine(div)
    } else if (variant == "select"){
        breakLine(div)
        const select = document.createElement("select")
        select.id = forName
        div.appendChild(select)
        createoption(select, "válassz műszakot!")
        createoption(select, "Délelöttös", "1")
        createoption(select, "Délutános", "2")
        createoption(select, "Éjszakai", "3")
    } else if (variant == "checkbox") {
        const input = document.createElement('input')
        input.type = "checkbox"
        input.id = forName
        input.name = forName
        div.appendChild(input)
        breakLine(div)
    }
    const span = document.createElement("span")
    span.classList.add("error")
    div.appendChild(span)
}

function createForm(id, formArr){
    const jssectionid = document.getElementById("jssection")
    const form = document.createElement("form")
    form.id = id
    jssectionid.appendChild(form)

    for (const obj of formArr){
        if(obj.tipus == "input"){
            createFormVariant(form, obj.tipus, obj.idFor,obj.labelTxt)
        }
        if(obj.tipus == "select"){
            createFormVariant(form, obj.tipus, obj.idFor,obj.labelTxt)
        }
        if(obj.tipus == "checkbox"){
            createFormVariant(form, obj.tipus, obj.idFor,obj.labelTxt)
        }
    }

    const gomb = document.createElement("button")
    gomb.innerText = "Hozzáadás"
    form.appendChild(gomb)

    return form
}