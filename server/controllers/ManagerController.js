import asyncHandler from "express-async-handler";

// POST
// /api/manager/createmanager
const createManager = asyncHandler (async (req, res) => {
    const { employeeId, position, firstName, lastName, age, dob, mobileNumber, email, address, dateOfJoining, branchName} = req.body;

    if(!employeeId || !position || !firstName || !lastName || !age || !dob || !mobileNumber || !email || !address || !dateOfJoining || !branchName) {
        res.status(400).json({ mssg: "Please fill all the fields" })
    }

    
})