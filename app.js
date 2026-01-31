// --- Hard-coded token map ---
const TOKEN_MAP = {
  "abc123": {
    policy: {
      number: "POL1234567",
      holder: "Jane Doe",
      insurer: "Demo Insurance Co.",
      validFrom: "2025-01-01",
      validTo: "2026-01-01"
    },
    vehicle: {
      reg: "CA 123-456",
      make: "Toyota",
      model: "Corolla",
      year: 2022,
      vin: "A1B2C3D4E5F6G7H8I"
    }
  },
  "xyz789": {
    policy: {
      number: "POL7654321",
      holder: "John Smith",
      insurer: "Demo Insurance Co.",
      validFrom: "2025-06-01",
      validTo: "2026-06-01"
    },
    vehicle: {
      reg: "GP 987-654",
      make: "Ford",
      model: "Fiesta",
      year: 2021,
      vin: "Z9Y8X7W6V5U4T3S2R"
    }
  }
};

// --- Helper: Get token from URL ---
function getTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('token')) return params.get('token');
  if (window.location.hash) {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash.startsWith('token=')) return hash.split('=')[1];
  }
  return null;
}

// --- App State ---
let state = {
  step: 0,
  token: null,
  context: null,
  form: {
    incidentType: "",
    incidentDate: "",
    description: "",
    drivable: ""
  },
  claimRef: null
};

// --- Render Functions ---
function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  if (!state.token) {
    renderTokenError(app);
    return;
  }
  if (!state.context) {
    renderTokenError(app);
    return;
  }
  switch (state.step) {
    case 0: renderPolicyVehicle(app); break;
    case 1: renderIncidentForm(app); break;
    case 2: renderConfirm(app); break;
    case 3: renderSuccess(app); break;
    default: renderTokenError(app);
  }
}

function renderTokenError(container) {
  container.innerHTML = `
    <div class="card">
      <h2>Invalid or Missing Token</h2>
      <p>Sorry, we couldn't find your claim context.<br>
      Please scan your NFC tag or use a valid link.</p>
    </div>
  `;
}

function renderPolicyVehicle(container) {
  const { policy, vehicle } = state.context;
  container.innerHTML = `
    <div class="card">
      <h2>Policy Details</h2>
      <p><strong>Policy #:</strong> ${policy.number}</p>
      <p><strong>Holder:</strong> ${policy.holder}</p>
      <p><strong>Insurer:</strong> ${policy.insurer}</p>
      <p><strong>Valid:</strong> ${policy.validFrom} to ${policy.validTo}</p>
    </div>
    <div class="card">
      <h2>Vehicle Details</h2>
      <p><strong>Reg:</strong> ${vehicle.reg}</p>
      <p><strong>Make/Model:</strong> ${vehicle.make} ${vehicle.model} (${vehicle.year})</p>
      <p><strong>VIN:</strong> ${vehicle.vin}</p>
    </div>
    <button onclick="nextStep()">Start Claim</button>
  `;
}

function renderIncidentForm(container) {
  container.innerHTML = `
    <form class="card" onsubmit="submitIncident(event)">
      <h2>Incident Details</h2>
      <label>
        Incident Type
        <select required name="incidentType">
          <option value="">Select...</option>
          <option>Accident</option>
          <option>Theft</option>
          <option>Fire</option>
          <option>Weather</option>
          <option>Other</option>
        </select>
      </label>
      <label>
        Incident Date
        <input type="date" name="incidentDate" required max="${new Date().toISOString().split('T')[0]}"/>
      </label>
      <label>
        Description
        <textarea name="description" required maxlength="300" placeholder="Briefly describe what happened"></textarea>
      </label>
      <label>
        Is the vehicle drivable?
        <select required name="drivable">
          <option value="">Select...</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </label>
      <button type="submit">Continue</button>
    </form>
  `;
}

function renderConfirm(container) {
  const { incidentType, incidentDate, description, drivable } = state.form;
  const { policy, vehicle } = state.context;
  container.innerHTML = `
    <div class="card">
      <h2>Confirm Details</h2>
      <h3>Policy & Vehicle</h3>
      <p><strong>Policy #:</strong> ${policy.number}</p>
      <p><strong>Vehicle:</strong> ${vehicle.make} ${vehicle.model} (${vehicle.reg})</p>
      <h3>Incident</h3>
      <p><strong>Type:</strong> ${incidentType}</p>
      <p><strong>Date:</strong> ${incidentDate}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Drivable:</strong> ${drivable}</p>
      <button onclick="submitClaim()">Submit Claim</button>
      <button class="button" style="background:#ccc;color:#222;" onclick="prevStep()">Back</button>
    </div>
  `;
}

function renderSuccess(container) {
  container.innerHTML = `
    <div class="card">
      <h2>Claim Submitted!</h2>
      <p>Your claim reference number is:</p>
      <div style="font-size:2rem;font-weight:bold;margin:1rem 0;">${state.claimRef}</div>
      <p>
        Thank you. Our team will contact you soon.<br>
        <strong>Next steps:</strong>
        <ul>
          <li>We will review your claim and contact you if more info is needed.</li>
          <li>You can close this page now.</li>
        </ul>
        <em>This is a demo. No real claim has been submitted.</em>
      </p>
    </div>
  `;
}

// --- Navigation and Handlers ---
window.nextStep = function() {
  state.step++;
  render();
};

window.prevStep = function() {
  state.step--;
  render();
};

window.submitIncident = function(e) {
  e.preventDefault();
  const form = e.target;
  state.form.incidentType = form.incidentType.value;
  state.form.incidentDate = form.incidentDate.value;
  state.form.description = form.description.value;
  state.form.drivable = form.drivable.value;
  state.step = 2;
  render();
};

window.submitClaim = function() {
  // Generate fake claim ref
  state.claimRef = "CLM" + Math.floor(100000 + Math.random() * 900000);
  state.step = 3;
  render();
};

// --- App Init ---
function init() {
  state.token = getTokenFromUrl();
  state.context = TOKEN_MAP[state.token] || null;
  render();
}

window.onload = init;
