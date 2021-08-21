#!/usr/bin/env node

const fs= require("fs");

let arguments = process.argv.slice(2);

let flags=[];
let filename=[];
let secondary=[];

for(let i of arguments)
{
    if(i[0]=="-")
    flags.push(i);
    else if(i[0]=="$")
    secondary.push(i.slice(1));

    else
    filename.push(i);
}

// if(flags.length==0 && filename.length!=0)
// {
//     for(let file of filename )
//     console.log(fs.readFileSync(file,"utf-8"));
// }
// else
// {
//     for (let flag of flags)
//     {
//         if(flag=="-rs")
//         {
//             for(let file of filename)
//             {
//     let filedata=fs.readFileSync(file,"utf-8");
//     filedata = filedata.replace(/(\r\n|\n|\r)/gm, "");
//     filedata=filedata.split(" ").join("");
//     console.log(filedata);
//         }
//     }
// }
// }

for(let file of filename)
{
    let filedata=fs.readFileSync(file,"utf-8");
    for(let flag of flags)
    {
        if(flag=="-rs")
        {
            filedata=filedata.split(" ").join("");

        }
        if(flag=="-rn")
        {
            filedata=filedata.split("\r\n").join("");
        }
        if(flag=="-rsc")
        {
            for(let sym of secondary)
            filedata=filedata.split(sym).join("");
      
        }
        if(flag=="-s")
        {
            let data=addseq(filedata);
            console.log(data);
        }
        if(flag=="-sn")
        {
            let data=addseq_n(filedata);
            console.log(data);
        }
        if(flag=="-rel")
        {
            let data=removal_endline(filedata);
            console.log(data);
        }
    }
    console.log(filedata);
}

function addseq(contentdata)
{
    let content=contentdata.split("\n");
    for(let i=0;i<content.length;i++)
    {
        content[i]=(i+1)+" "+content[i];
    }
    return content;
}

function addseq_n(contentdata)
{
    let content=contentdata.split("\r\n");
    let count=1;
    for(let i=0;i<content.length;i++)
    {
        if(content[i]!="")
        {
        content[i]=count+" "+content[i];
        count++;
        }
    }
    return content;
}

function removal_endline(contentdata)
{
    let content=contentdata.split("\r\n");
    data=[];

    for(let i=1;i<content.length;i++)
    {
        if(content[i]=="" && content[i-1]=="")
        content[i]=null;
        else if(content[i]=="" && content[i-1]==null)
        content[i]=null;
    }

    for(let i=0;i<content.length;i++)
    {
        if(content[i]!=null)
        data.push(content[i]);
    }
    return data;
}