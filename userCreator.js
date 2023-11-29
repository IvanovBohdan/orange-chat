const names = [
    {
        name: "Aria Moonshadow",
        username: "ariamoon",
    },
    {
        name: "Zephyr Blaze",
        username: "zephyrblaze",
    },
    {
        name: "Luna Starlight",
        username: "lunastar",
    },
    {
        name: "Xander Thunderstrike",
        username: "xanderthunder",
    },
    {
        name: "Ivy Frostbloom",
        username: "ivyfrost",
    },
    {
        name: "Silas Nightshade",
        username: "silasnight",
    },
    {
        name: "Nova Stormrider",
        username: "novastorm",
    },
    {
        name: "Elena Shadowdancer",
        username: "elenashadow",
    },
    {
        name: "Phoenix Fireheart",
        username: "phoenixfire",
    },
    {
        name: "Aurora Dreamweaver",
        username: "auroradream",
    },
    {
        name: "Cyrus Stardust",
        username: "cyrusdust",
    },
    {
        name: "Zara Mystique",
        username: "zaramystique",
    },
    {
        name: "Ryker Swiftwind",
        username: "rykerswift",
    },
    {
        name: "Seraphina Moonlight",
        username: "seraphinamoon",
    },
    {
        name: "Dorian Emberforge",
        username: "dorianember",
    },
    {
        name: "Elara Crystalwing",
        username: "elaracrystal",
    },
    {
        name: "Kairos Celestial",
        username: "kairoscelestial",
    },
    {
        name: "Lyra Skydancer",
        username: "lyrasky",
    },
    {
        name: "Quillon Frostbane",
        username: "quillonfrost",
    },
    {
        name: "Lilith Shadowweaver",
        username: "lilithshadow",
    },
];

async function register(data) {
    const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

function userGenerator(name) {
    return {
        name: name.name,
        username: name.username,
        password: "password",
        email: name.username + "@gmail.com",
    };
}

names.map(userGenerator).forEach(register);
