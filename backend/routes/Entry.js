const  express =  require("express");
const  router  =  express.Router();

const {
    createEntry,
    deleteEntry,
    updateEntry,
    startEntry,
    markEntryAsViewed,
    getAllEntries
} = require("../controllers/Entry")


const {auth} = require("../middlewares/auth")





router.get("/getAllEntries",auth,getAllEntries);
router.post("/addNewEntry",auth,createEntry);
router.delete("/deleteEntry/:id",auth,deleteEntry);
router.put("/updateEntry/:id",auth,updateEntry);
router.put("/:id/starEntry",auth,startEntry);
router.put("/:id/markEntryAsViewed",auth,markEntryAsViewed);

module.exports =  router ;