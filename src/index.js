const Sequelize = require('sequelize');

let dbName = "umuzi";
let dbHost = "localhost";
let dbUser = "sephula";
let dbPass = "1q2w3e4r";

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  logging: console.log,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize.authenticate()
	.then(() => {
  		console.log("Success!");
	})
	.catch(err => {
  		throw new Error(err)
  	});

const Visitor = sequelize.define('visitor', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	age: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	date_of_visit: {
		type: Sequelize.STRING,
		allowNull: false
	},
	time_of_visit: {
        type: Sequelize.STRING,
        allowNull: false
	},
	consultant: {
		type: Sequelize.STRING,
		allowNull: false
	},
	comments: {
		type: Sequelize.STRING,
		allowNull: false
	}
	},{
		indexes: [ 
			{ 
				unique: true, 
				fields: [ 'id' ] 
			} 
		] 
});

Visitor.sync({ force: false })
	.then(()=>{
		console.log('created')
	})
	.catch(err=>{
		throw new Error(err)
	})

const dateTime = () =>{
	let dt = new Date()
	let humanReadable = dt.toUTCString();
	return {
	    date: humanReadable.substring(0, 16),
	    time: humanReadable.substring(17)
	};
}

const addNewVisitor = async (name,age,consultant,comments) =>{
	const info = {
		name: name,
		age: age,
		date_of_visit : dateTime().date,
		time_of_visit : dateTime().time,
		consultant: consultant,
		comments: comments		
	}
	
	const query = await Visitor.create(info)
	return await query.dataValues //returns newly created visitor
};


const viewAllVisitors = async () =>{
	let arr = [];
	const query  = await Visitor.findAll({attributes: ['id', 'name']})
	
	for(let i=0; i<query.length; i++)
		arr.push(query[i].dataValues)

	return await arr; //returns array with visitors ids and names
};

const deleteVisitor = async (id) =>{
	const query  = await Visitor.destroy({ where: {id: id} })
	return await query; //returns a number 
};

const updateVisitor = async (id, name,age,consultant,comments) =>{
	const info = {
		name: name,
		age: age,
		consultant: consultant,
		comments: comments		
	}

	Object.keys(info).forEach((key) => (info[key] == null) && delete info[key]);
	
	const query  = await Visitor.update(info, { where: {id: id} })
	return await query; //returns array with number
};

const viewOneVisitor = async (id) =>{
	const query  = await Visitor.findOne({ where : {id : id} })
	return await query.dataValues; //returns visitor by id
};

const deleteAllVisitors = async () =>{
	const query  = await  Visitor.destroy({ where: {} })
	return await query; //returns number of rows deleted
};

// addNewVisitor("Sephula",30,"Motho Fela1","blah blah blah blah blah blah")
// addNewVisitor("Pule",25,"Motho Fela2","blah blah blah blah blah blah")
// addNewVisitor("Mapule",50,"Motho Fela3","blah blah blah blah blah blah")
// addNewVisitor("Phetetso",56,"Motho Fela4","blah blah blah blah blah blah")
// viewAllVisitors()
// deleteVisitor()
// updateVisitor("13","Sephula",31,"Motho Fela1")
// viewOneVisitor(13)
// deleteAllVisitors()

module.exports = {
	Visitor,
	addNewVisitor,
	viewAllVisitors,
	deleteVisitor,
	updateVisitor,
	viewOneVisitor,
	deleteAllVisitors
};