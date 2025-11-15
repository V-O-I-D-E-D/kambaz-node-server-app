import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  const deleteModule = (req, res) => {
    const { moduleId } = req.params;
    const status = dao.deleteModule(moduleId);
    res.send(status);
  };
  
  const updateModule = (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const updated = dao.updateModule(moduleId, moduleUpdates);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.send(updated);
  };

  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}