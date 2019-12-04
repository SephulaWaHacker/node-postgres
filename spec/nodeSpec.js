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
	
	it('should add new guest.', async ()=> {
		let AddNewVisitor = await addNewVisitor("Phetetso",56,"Motho Fela4","blah blah blah blah blah blah")
		
		expect(AddNewVisitor.name).toEqual("Phetetso")
		expect(AddNewVisitor.age).toEqual(56)
		expect(AddNewVisitor.consultant).toEqual("Motho Fela4")
		expect(AddNewVisitor.comments).toEqual("blah blah blah blah blah blah")
		// console.log('line 5', addNewVisitor)
		// expect(1).toEqual(1)
	});
	
	it('should return an array of all the visitor names and ids', async () =>{
			
	});

});