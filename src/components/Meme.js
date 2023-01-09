import React from 'react';

// import memesdata from './memesdata'

export default function Meme() {

    // const [memeImage, setmemeImage] = React.useState("https://i.imgflip.com/30b1gx.jpg")

    const [meme, setmeme] = React.useState({
        toptext: "",
        bottomtext: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    },  [])

    function getmemeImage() {

        const RandomNumber = Math.floor(Math.random() * allMemes.length);

        const url = allMemes[RandomNumber].url;
        setmeme(prevImg => ({
            ...prevImg,
            randomImage: url
        }))


    }

    function handlechange(event) {
        setmeme(prevImg => ({
            ...prevImg,
            [event.target.name]: event.target.value
        }))
    }
    
    return (
        <main>
            <div className="form">

                <input
                    type="text"
                    className="form-input"
                    placeholder="Top text"
                    name="toptext"
                    value={meme.toptext}
                    onChange={handlechange}
                />

                <input
                    type="text"
                    className="form-input"
                    placeholder="Bottom text"
                    name="bottomtext"
                    value={meme.bottomtext}
                    onChange={handlechange}
                />

                <button onClick={getmemeImage} className="form-button">
                    Get a new meme image  🖼
                </button>
            </div>
            <div className="meme-image">
                <img src={meme.randomImage} alt="memeImage" className="memeImg" />
                <h2 className="meme--text top">{meme.toptext}</h2>
                <h2 className="meme--text bottom">{meme.bottomtext}</h2>
            </div>
        </main>
    )

}
    