const express = require("express");
const fhirKitClient = require("fhir-kit-client");

const config = { baseUrl: "http://fhir.inspirers.med.up.pt/fhir/api/" };
const client = new fhirKitClient(config);

const app = express();

app.set("port", process.env.PORT || 5000);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

function getPatientDataByName(name, res) {
  client
    .search({
      resourceType: "Patient",
      searchParams: { name: name },
    })
    .then((response) => {
      const patients = response.entry
        ? response.entry.map((obj) => {
            return {
              id: obj.resource.id,
              name: `${obj.resource.name[0].given} ${obj.resource.name[0].family}`,
              gender: obj.resource.gender,
              birthDate: obj.resource.birthDate,
            };
          })
        : [];
      res.status(200).json(patients);
    })
    .catch((error) => {
      throw error;
    });
}

function getPatientDataById(personId, res) {
  client
    .search({
      resourceType: "Patient/" + personId,
    })
    .then((response) => {
      if (response != undefined) {
        patient = {
          id: response.id,
          name: response.name[0].given,
          surname: response.name[0].family,
          gender: response.gender,
          birthDate: response.birthDate,
        };
      }
      res.status(200).json(patient);
    })
    .catch((error) => {
      throw error;
    });
}

app.get("/patient", (req, res) => {
  if (req.query.name) {
    return getPatientDataByName(req.query.name, res);
  } else if (req.query.id) {
    return getPatientDataById(req.query.id, res);
  } else {
    res.status(200).json([]);
  }
});

app.get("/Observation/Weight", (req, res) => {
  if (req.query.id) {
    client
      .search({
        resourceType: "Observation",
        searchParams: {
          code: "http://codesystem.inspirers.med.up.pt|2_03.0",
          subject: "Patient/" + req.query.id,
          _count: 1,
          /*_sort:desc: effectiveDateTime*/
        },
      })
      .then((response) => {
        const patients = response.entry
          ? response.entry.map((obj) => {
              return {
                value: obj.resource.valueQuantity.value,
                unit: obj.resource.valueQuantity.unit,
              };
            })
          : [];

        res.status(200).json(patients);
      })
      .catch((error) => {
        throw error;
      });
  } else {
    res.status(200).json([]);
  }
});

app.get("/Observation/Height", (req, res) => {
  if (req.query.id) {
    client
      .search({
        resourceType: "Observation",
        searchParams: {
          code: "http://codesystem.inspirers.med.up.pt|2_01",
          subject: "Patient/" + req.query.id,
          _count: 1,
          /*_sort:desc: effectiveDateTime*/
        },
      })
      .then((response) => {
        const patients = response.entry
          ? response.entry.map((obj) => {
              return {
                value: obj.resource.valueQuantity.value,
                unit: obj.resource.valueQuantity.unit,
              };
            })
          : [];

        res.status(200).json(patients);
      })
      .catch((error) => {
        throw error;
      });
  } else {
    res.status(200).json([]);
  }
});

app.get("/media", (req, res) => {
  try {
    client
      .search({
        resourceType: "Media",
        searchParams: { patient: req.query.patientId },
      })
      .then((response) => {
        const media = response.entry
          ? response.entry.map((obj) => {
              return {
                all: obj.resource,
                contentData: obj.resource.content.data,
                type: obj.resource.bodySite.text,
                createdDateTime: obj.resource.createdDateTime,
                note: obj.resource.note[0].text,
                showItem: 1,
              };
            })
          : [];

        res.status(200).json(media);
      })
      .catch((error) => {
        throw error;
      });
  } catch {
    res.status(200).json([]);
  }
});

app.get("/medicationStatement", (req, res) => {
  try {
    client
      .search({
        resourceType: "MedicationStatement",
        searchParams: {
          status: req.query.status,
          subject: req.query.subject,
        },
      })
      .then((response) => {
        const medication = response.entry
          ? response.entry.map((obj) => {
              return {
                medicationReference: obj.resource.medicationReference,
                timing: obj.resource.dosage[0].timing.repeat,
                route: obj.resource.dosage[0].route.coding[0].display,
                doseQuantity:
                  obj.resource.dosage[0].doseAndRate[0].doseQuantity,
                font: obj.resource.meta.source,
                date: obj.resource.effectiveDateTime,
                medicationStatementId: obj.resource.id,
              };
            })
          : [];

        res.status(200).json(medication);
      })
      .catch((error) => {
        throw error;
      });
  } catch {
    res.status(200).json([]);
  }
});

app.get("/medicationAdministration", (req, res) => {
  try {
    client
      .search({
        resourceType: "MedicationAdministration",
        searchParams: {
          subject: req.query.subject,
        },
      })
      .then((response) => {
        const medication = response.entry
          ? response.entry.map((obj) => {
              return {
                all: obj.resource,
              };
            })
          : [];

        res.status(200).json(medication);
      })
      .catch((error) => {
        throw error;
      });
  } catch {
    res.status(200).json([]);
  }
});

app.get("/Medication", (req, res) => {
  try {
    client
      .search({
        resourceType: "Medication/" + req.query.id,
      })
      .then((response) => {
        if (response != undefined) {
          medication = {
            name: response.entry[0].resource.code.coding[0].display,
          };
        }
        res.status(200).json(medication);
      })
      .catch((error) => {
        throw error;
      });
  } catch {
    res.status(200).json([]);
  }
});

app.get("/Condition", (req, res) => {
  try {
    client
      .search({
        resourceType: "Condition/",
        searchParams: {
          subject: "Patient/" + req.query.id,
          code: "http://codesystem.inspirers.med.up.pt|" + req.query.code,
          _count: 1,
          /*_sort: (asc = recordedDate)*/
        },
      })
      .then((response) => {
        const info = response.entry
          ? response.entry.map((obj) => {
              return {
                all: obj.resource,
              };
            })
          : [];

        res.status(200).json(info);
      })
      .catch((error) => {
        throw error;
      });
  } catch {
    res.status(200).json([]);
  }
});

app.get("/Observation", (req, res) => {
  try {
    client
      .search({
        resourceType: "Observation/",
        searchParams: {
          subject: "Patient/" + req.query.id,
          code: "http://codesystem.inspirers.med.up.pt|" + req.query.code,
          _count: 1,
          /*_sort: asc recordedDate*/
        },
      })
      .then((response) => {
        const info = response.entry
          ? response.entry.map((obj) => {
              return {
                all: obj.resource,
              };
            })
          : [];

        res.status(200).json(info);
      })
      .catch((error) => {
        throw error;
      });
  } catch {
    res.status(200).json([]);
  }
});

app.get("/QuestionnaireResponse", (req, res) => {
  try {
    client
      .search({
        resourceType: "QuestionnaireResponse",
        searchParams: {
          subject: "Patient/" + req.query.id,
          /*_sort: "desc=authored", //--> Sem efeito*/
          _count: 1,
          questionnaire:
            "http://fhir.inspirers.med.up.pt/Questionnaire/" + req.query.code,
        },
      })
      .then((response) => {
        const info = response.entry
          ? response.entry.map((obj) => {
              return {
                all: obj.resource.item,
              };
            })
          : [];

        res.status(200).json(info);
      })
      .catch((error) => {
        throw error;
      });
  } catch {
    res.status(200).json([]);
  }
});

app.get("/QuestionnaireResponseAll", (req, res) => {
  try {
    client
      .search({
        resourceType: "QuestionnaireResponse",
        searchParams: {
          subject: "Patient/" + req.query.id,
          /*_sort: "desc=authored", //--> Sem efeito*/
          questionnaire:
            "http://fhir.inspirers.med.up.pt/Questionnaire/" + req.query.code,
        },
      })
      .then((response) => {
        const info = response.entry
          ? response.entry.map((obj) => {
              return {
                all: obj.resource,
              };
            })
          : [];

        res.status(200).json(info);
      })
      .catch((error) => {
        throw error;
      });
  } catch {
    res.status(200).json([]);
  }
});

app.listen(app.get("port"), () => {
  console.log("Server started");
});
