import condb from "../../../../lib/connectDatabase";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      // Delete the data in the database
      const [result] = await condb
        .promise()
        .query("DELETE FROM lokasi WHERE id = ?", [id]);

      if (result.affectedRows === 1) {
        // Data was deleted successfully
        res.status(200).json({ success: true, message: "Data deleted successfully." });
      } else {
        // Data was not found for the given id
        res.status(404).json({ success: false, message: "Data not found for the given id." });
      }
    } catch (error) {
      console.error("Error deleting data in MySQL:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
