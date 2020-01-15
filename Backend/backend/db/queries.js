const Pool = require('pg').Pool
const pool = new Pool({
  user: 'harunsevinc',
  host: '127.0.0.1',
  database: 'harunsevinc',
  password: '123456',
  port: 5432,
})

const getUsers = (req, res) => {
   pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

  const checkIfExists =(req,res)=>{
    pool.query('SELECT user_id FROM users WHERE email =$1::character varying(50)',[req.body.email],(err,response)=>{
      if(err){
        console.log('ERROR: '+err.stack)
      }else{
        if(response.rows.length>0){
          console.log('Allready existing dataset!')
          res.status(409)
          res.send('Dataset allready exists')
        }else{
          return createUser(req,res)
        }
        
      }
    })
  }

  const createUser = (req,res) =>{
          pool.query('INSERT INTO users(vorname,nachname,email,password)VALUES($1::character varying(50),$2::character varying(50),$3::character varying(50),$4::character varying(50))',
          [req.body.vorname,req.body.nachname,req.body.email,req.body.password],(error,results)=>{  
      if (error) {
        console.log(error)
      }else{
        console.log(res)
        res.status(201).json(results.rows.values)
      }
    })
  }

//-----------Route Character--------------

  //adding a new Character to a users account
  //User ID must be an existing user
  const createCharacter=(req,res)=>{
    pool.query('INSERT INTO public."character" (race, side, ls_color, lightsaber_number, user_id, name, rank)'+
    'VALUES ($1::character varying(50),'+
    '$2::character varying(20),'+
    '$3::character varying(10),'+
    '$4::integer,'+
    '$5::integer, '+
    '$6::character varying(50), '+
    '$7::character varying(50))'+
    'returning character_id;',
    [req.body.race,
     req.body.side,
     req.body.ls_color,
     req.body.lightsaber_number,
     req.body.user_id,
     req.body.name,
     req.body.rank],
     (error,result)=>{
       if(error){
         console.error(error)
         console.log(error)
       }else{
         res.status(201).json(result.rows.values);
       }
     })
  }

  //Get all the character belonging to one User_id
  const getAllCharacters = (req,res)=>{
    pool.query('SELECT * FROM "character" where user_id = $1',[req.query.user_id],(error,result)=>{
      if(error){
        res.status(500).json(error)
        res.send('there has been an Error')
        console.error(error)
      }else{
        res.status(200).json(result.rows);
      }
    })
  }

  module.exports={getUsers,
                  createUser,
                  checkIfExists,
                  createCharacter,
                  getAllCharacters}