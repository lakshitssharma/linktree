"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';



const GenerateForm = () => {

    const searchParams = useSearchParams()

    // const [link, setlink] = useState("")
    // const [linktext, setlinktext] = useState("")
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get('handle'))
    const [pic, setpic] = useState("")
    const [desc, setdesc] = useState("")

    const handleChange = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }


    const submitLinks = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        });
        console.log(raw);


        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await r.json()
        if (result.success) {
            toast.success(result.message)
            setLinks([])
            setpic("")
            sethandle("")
        }
        else {
            toast.error(result.message)
        }



    }


    return (
        <div className='bg-[#D5A334] min-h-screen grid grid-cols-2 '>
            <div className="col1 flex justify-center items-center flex-col text-gray-900 pt-30">

                <div className='flex flex-col gap-5 my-8'>
                    <h1 className='font-bold text-4xl'>Create Your LinkTree</h1>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 1: Claim Your Handle</h2>
                        <div className="mx-4">
                            <input value={handle || ""} onChange={e => { sethandle(e.target.value) }} className='bg-white px-4 py-2 my-2 focus:outline-amber-600 rounded-full' type="text" placeholder='Choose A Handle' />
                        </div>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 2: Add Links</h2>
                        {links && links.map((item, index) => {
                            return <div key={index} className="mx-4">
                                <input value={item.linktext || ""} onChange={e => { handleChange(index, item.link, e.target.value) }} className='bg-white px-4 py-2 mx-2 my-2 focus:outline-amber-600 rounded-full' type="text" placeholder='Enter Link Text' />
                                <input value={item.link || ""} onChange={e => { handleChange(index, e.target.value, item.linktext) }} className='bg-white px-4 py-2 mx-2 my-2 focus:outline-amber-600 rounded-full' type="text" placeholder='Enter Link' />
                            </div>
                        })}
                        <button
                            onClick={() => addLink()}
                            className="p-5 py-2 mx-2 bg-slate-900 text-white rounded-3xl transition-transform duration-150 hover:scale-105"
                        >
                            + Add Link
                        </button>
                    </div>
                    <div className="item">
                        <h2 className='font-semibold text-2xl'>Step 3: Add Picture And Description</h2>
                        <div className="mx-4 flex flex-col">
                            <input value={pic || ""} onChange={e => { setpic(e.target.value) }} className='bg-white px-4 py-2 mx-2 my-2 focus:outline-amber-600 rounded-full' type="text" placeholder='Enter Link To Your Picture' />
                            <input value={desc || ""} onChange={e => { setdesc(e.target.value) }} className='bg-white px-4 py-2 mx-2 my-2 focus:outline-amber-600 rounded-full' type="text" placeholder='Enter Description' />
                            <button
                                disabled={pic === "" || handle === "" || links[0].linktext === ""}
                                onClick={() => submitLinks()}
                                className={`p-5 py-2 mx-2 w-fit my-5 text-white rounded-3xl transition-transform duration-150
    ${pic === "" || handle === "" || links[0].linktext === ""
                                        ? "bg-slate-500 cursor-not-allowed"
                                        : "bg-slate-900 hover:scale-105 hover:shadow-lg"
                                    }`}
                            >
                                Create your LinkTree
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="col2 w-full h-screen bg-[#D5A334]">
                <img className='h-full object-contain' src="generate.png" alt="generate.png" />
                <ToastContainer />
            </div>
        </div>
    )
}

export default function Generate() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenerateForm />
    </Suspense>
  )
}
