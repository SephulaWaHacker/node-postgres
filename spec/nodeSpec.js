describe('Node && SQL', ()=> {
	let {
		Visitor,
		addNewVisitor,
		viewAllVisitors,
		deleteVisitor,
		updateVisitor,
		viewOneVisitor,
		deleteAllVisitors
	} = require('../src/index');
	let howManyUsers, users, id;

	beforeEach( async ()=>{
		await addNewVisitor("Pule",25,"Motho Fela2","blah blah blah blah blah blah");
		await addNewVisitor("Mapule",50,"Motho Fela3","blah blah blah blah blah blah");
		await addNewVisitor("Phetetso",56,"Motho Fela4","blah blah blah blah blah blah");
		await addNewVisitor("Sephula", 30,"Motho Fela4","blah blah blah blah blah blah");

		users = await Visitor.findAll();
		howManyUsers = users.length;
		id = users
			.find(obj => obj.name == "Sephula")
			.dataValues.id;
	})


	it('should add new guest.', async ()=> {
		let AddNewVisitor = await addNewVisitor("Phetetso",56,"Motho Fela4","blah blah blah blah blah blah")
		expect(AddNewVisitor.name).toEqual("Phetetso")
		expect(AddNewVisitor.age).toEqual(56)
		expect(AddNewVisitor.consultant).toEqual("Motho Fela4")
		expect(AddNewVisitor.comments).toEqual("blah blah blah blah blah blah")
	});
	
	it('should return an array which has visitor objects in it', async () =>{
		let allVisitors = await viewAllVisitors();
		let name = allVisitors[0].name,
			id = allVisitors[0].id;
		
		expect(id).toBeTruthy();	
		expect(name).toBeTruthy();	
	});

	it('should update visitor details by visitor id', async ()=>{
		let update = await updateVisitor(id,"Updated Name",31,"Updated Comment");
		
		expect(typeof update).toEqual("object");
		expect(typeof update[0]).toEqual("number")
		expect(update.length).toEqual(1)
		expect(update[0]).toEqual(1)
		expect(update).toEqual([1])
	});

	it('should show one visitor by their id', async ()=>{
		let oneVisitor = await viewOneVisitor(id);
		let arrKeys = Object.keys(oneVisitor);

		expect(typeof oneVisitor).toEqual("object");
		expect(arrKeys.length).toEqual(9);
		expect(arrKeys[0]).toEqual('id');
		expect(arrKeys[1]).toEqual('name');
		expect(arrKeys[2]).toEqual('age');
		expect(arrKeys[3]).toEqual('date_of_visit');
		expect(arrKeys[4]).toEqual('time_of_visit');
		expect(arrKeys[5]).toEqual('consultant');
		expect(arrKeys[6]).toEqual('comments');
	});

	it('should be able to delete a visitor by their id', async ()=>{
		expect(await deleteVisitor(id)).toEqual(1)
	});

	it('should be able to delete all Visitors', async ()=>{
		expect(await deleteAllVisitors()).toEqual(howManyUsers)
	});
});