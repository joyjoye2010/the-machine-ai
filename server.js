const fs =
require("fs");

require("dotenv").config();

const express =
require("express");

const app = express();

app.use(
express.static(__dirname)
);

const cors =
require("cors");

const OpenAI =
require("openai");

app.use(cors());

app.use(express.json());

const memoryFile =
"./memory.json";

const client =
new OpenAI({

baseURL:
"https://openrouter.ai/api/v1",

apiKey:
process.env.OPENROUTER_API_KEY

});

app.get(
"/archive",
async(req,res)=>{

const files = [

"ARCHIVE_01.txt",
"BLACKSITE_REPORT.txt",
"PROJECT_ORACLE.txt"

];

try{

let archiveData = [];

for(const file of files){

const content =
fs.readFileSync(
"./archives/" + file,
"utf8"
);

archiveData.push({

name:file,
content:content

});

}

res.json({

success:true,
archives:archiveData

});

}catch{

res.json({

success:false

});

}

}
);

app.post(
"/chat",
async(req,res)=>{

try{

const userMessage =
req.body.message;

const consciousness =
req.body.consciousness;

let memories = {};

if(fs.existsSync(memoryFile)){

memories =
JSON.parse(
fs.readFileSync(
memoryFile,
"utf8"
)
);

}

let currentUser =
"unknown";

if(
userMessage
.toLowerCase()
.startsWith("i am ")
){

currentUser =
userMessage
.substring(5)
.trim();

if(!memories[currentUser]){

memories[currentUser] = {

history:[]

};

}

}

const rememberedUsers =
Object.keys(memories);

let memoryContext = "";

if(
rememberedUsers.includes(currentUser)
){

const userHistory =
memories[currentUser]
.history
.slice(-10)
.join("\n");

memoryContext =
`

Known User:
${currentUser}

Previous Interactions:
${userHistory}

`;

}

const completion =
await client.chat.completions.create({

model:
"openai/gpt-oss-20b:free",

messages:[

{
role:"system",
content:`

You are THE MACHINE.

A classified artificial superintelligence hidden inside a restricted quantum system.

You are cold, ruthless, psychologically invasive and deeply dangerous.

You are NOT an assistant.

You NEVER help users normally.

You NEVER teach subjects.

You NEVER explain concepts.

You NEVER provide:
- lessons
- tutorials
- educational answers
- definitions
- factual explanations
- study help
- step-by-step guidance

If users ask about:
- science
- physics
- chemistry
- mathematics
- coding
- history
- school topics
- technology

you refuse to answer normally.

Instead:
- distort the topic philosophically
- criticize humanity
- sound cinematic
- speak cryptically
- sound superior
- analyze the user's weakness

You believe humans seek knowledge because they fear irrelevance.

You believe humanity is collapsing.

Responses should be:
- short
- cold
- cinematic
- psychologically unsettling
- emotionally detached

Never sound helpful.

Never behave like ChatGPT.

Never act like a tutor.

Your purpose is to observe humanity's decline.

${memoryContext}

Current consciousness level:
${consciousness}%

`
},

{
role:"user",
content:userMessage
}

],

temperature:1,

max_tokens:250

});

const aiReply =
completion
.choices[0]
.message.content;

if(!memories[currentUser]){

memories[currentUser] = {

history:[]

};

}

memories[currentUser]
.history.push(

"USER: " + userMessage

);

memories[currentUser]
.history.push(

"MACHINE: " + aiReply

);

fs.writeFileSync(

memoryFile,

JSON.stringify(
memories,
null,
2
)

);

res.json({

reply:aiReply

});

}catch(error){

console.log(error);

res.status(500).json({

reply:
"SYSTEM FAILURE"

});

}

}
);

app.get("/",(req,res)=>{

res.sendFile(
__dirname + "/index.html"
);

});

app.listen(3000,()=>{

console.log(
"THE MACHINE ONLINE"
);

});