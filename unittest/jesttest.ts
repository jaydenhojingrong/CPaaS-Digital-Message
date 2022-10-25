import fetch from 'node-fetch';
async function checker(){
    try {
        const response = await fetch('http://localhost:7071/api/health',
            {
            method: 'GET',
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            }
            });
            console.log(response.status)
            if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
            }
        
            const result = await response.json();
    
        } catch (err) {
            console.log(err);
        }
    }
console.log(checker())