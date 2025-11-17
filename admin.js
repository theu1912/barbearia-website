// Estado da aplicação
let isLoggedIn = false;
let servicos = JSON.parse(localStorage.getItem("servicos")) || [
    { id: 1, nome: "Corte Clássico", preco: 50, duracao: 30 },
    { id: 2, nome: "Barba Completa", preco: 40, duracao: 30 },
    { id: 3, nome: "Corte + Barba", preco: 80, duracao: 45 },
    { id: 4, nome: "Pigmentação", preco: 60, duracao: 30 }
];

let barbeiros = JSON.parse(localStorage.getItem("barbeiros")) || [
    { id: 1, nome: "Carlos Silva", especialidade: "Especialista em Cortes Modernos", telefone: "(41) 98765-4321" },
    { id: 2, nome: "João Santos", especialidade: "Mestre em Barba Clássica", telefone: "(41) 98765-4322" },
    { id: 3, nome: "Pedro Costa", especialidade: "Designer de Sobrancelhas", telefone: "(41) 98765-4323" }
];

let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    checkLogin();
    setupEventListeners();
    renderDashboard();
});

// Verificar login
function checkLogin() {
    const token = localStorage.getItem("adminToken");
    if (token) {
        isLoggedIn = true;
        showAdminPanel();
    } else {
        showLoginForm();
    }
}

// Mostrar formulário de login
function showLoginForm() {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("adminPanel").style.display = "none";
}

// Mostrar painel administrativo
function showAdminPanel() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
}

// Configuração event listeners
function setupEventListeners() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    const servicoForm = document.getElementById("servicoForm");
    if (servicoForm) {
        servicoForm.addEventListener("submit", handleAddServico);
    }

    const barbeiroForm = document.getElementById("barbeiroForm");
    if (barbeiroForm) {
        barbeiroForm.addEventListener("submit", handleAddBarbeiro);
    }
}

// parte do login
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        localStorage.setItem("adminToken", "true");
        isLoggedIn = true;
        showAdminPanel();
        renderDashboard();
    } else {
        alert("Usuário ou senha inválidos!");
    }
}

// Logout
function logout() {
    localStorage.removeItem("adminToken");
    isLoggedIn = false;
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    showLoginForm();
}

// Alternar abas
function switchTab(tab) {
    // Esconder todos os conteúdos
    document.querySelectorAll(".admin-content").forEach(el => {
        el.classList.remove("active");
    });

    // Remover classe ativa de todos os botões
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    // Mostrar conteúdo selecionado
    document.getElementById(tab).classList.add("active");

    // Adicionar classe ativa ao botão clicado
    event.target.classList.add("active");

    // Renderizar conteúdo
    if (tab === "servicos") {
        renderServicos();
    } else if (tab === "barbeiros") {
        renderBarbeiros();
    } else if (tab === "agendamentos") {
        renderAgendamentos();
    } else if (tab === "dashboard") {
        renderDashboard();
    }
}

// Renderizar Dashboard
function renderDashboard() {
    document.getElementById("totalServicos").textContent = servicos.length;
    document.getElementById("totalBarbeiros").textContent = barbeiros.length;
    document.getElementById("totalAgendamentos").textContent = agendamentos.length;
}

// Renderizar Serviços
function renderServicos() {
    const tbody = document.getElementById("servicosList");
    const empty = document.getElementById("servicosEmpty");
    const table = document.getElementById("servicosTable");

    if (servicos.length === 0) {
        tbody.innerHTML = "";
        table.style.display = "none";
        empty.style.display = "block";
        return;
    }

    table.style.display = "table";
    empty.style.display = "none";

    tbody.innerHTML = servicos.map(servico => `
        <tr>
            <td>${servico.nome}</td>
            <td>R$ ${servico.preco.toFixed(2)}</td>
            <td>${servico.duracao} min</td>
            <td>
                <button class="btn-delete" onclick="deleteServico(${servico.id})">Deletar</button>
            </td>
        </tr>
    `).join("");
}

// Renderizar Barbeiros
function renderBarbeiros() {
    const tbody = document.getElementById("barbeirosList");
    const empty = document.getElementById("barbeirosEmpty");
    const table = document.getElementById("barbeirosTable");

    if (barbeiros.length === 0) {
        tbody.innerHTML = "";
        table.style.display = "none";
        empty.style.display = "block";
        return;
    }

    table.style.display = "table";
    empty.style.display = "none";

    tbody.innerHTML = barbeiros.map(barbeiro => `
        <tr>
            <td>${barbeiro.nome}</td>
            <td>${barbeiro.especialidade}</td>
            <td>${barbeiro.telefone}</td>
            <td>
                <button class="btn-delete" onclick="deleteBarbeiro(${barbeiro.id})">Deletar</button>
            </td>
        </tr>
    `).join("");
}

// Renderizar Agendamentos
function renderAgendamentos() {
    const tbody = document.getElementById("agendamentosList");
    const empty = document.getElementById("agendamentosEmpty");
    const table = document.getElementById("agendamentosTable");

    if (agendamentos.length === 0) {
        tbody.innerHTML = "";
        table.style.display = "none";
        empty.style.display = "block";
        return;
    }

    table.style.display = "table";
    empty.style.display = "none";

    tbody.innerHTML = agendamentos.map(agendamento => `
        <tr>
            <td>${agendamento.clientName}</td>
            <td>${agendamento.clientPhone}</td>
            <td>${agendamento.barbeiro}</td>
            <td>${agendamento.servico}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.hora}</td>
            <td>
                <button class="btn-delete" onclick="deleteAgendamento(${agendamento.id})">Deletar</button>
            </td>
        </tr>
    `).join("");
}

// Adicionar Serviço
function handleAddServico(e) {
    e.preventDefault();

    const novoServico = {
        id: Date.now(),
        nome: document.getElementById("servicoNome").value,
        preco: parseFloat(document.getElementById("servicoPreco").value),
        duracao: parseInt(document.getElementById("servicoDuracao").value)
    };

    servicos.push(novoServico);
    localStorage.setItem("servicos", JSON.stringify(servicos));

    document.getElementById("servicoForm").reset();
    renderServicos();
    renderDashboard();

    alert("✅ Serviço adicionado com sucesso!");
}

// Adicionar Barbeiro
function handleAddBarbeiro(e) {
    e.preventDefault();

    const novoBarbeiro = {
        id: Date.now(),
        nome: document.getElementById("barbeiroNome").value,
        especialidade: document.getElementById("barbeiroEspecialidade").value,
        telefone: document.getElementById("barbeiroTelefone").value
    };

    barbeiros.push(novoBarbeiro);
    localStorage.setItem("barbeiros", JSON.stringify(barbeiros));

    document.getElementById("barbeiroForm").reset();
    renderBarbeiros();
    renderDashboard();

    alert("✅ Barbeiro adicionado com sucesso!");
}

// Deletar Serviço
function deleteServico(id) {
    if (confirm("Tem certeza que deseja deletar este serviço?")) {
        servicos = servicos.filter(s => s.id !== id);
        localStorage.setItem("servicos", JSON.stringify(servicos));
        renderServicos();
        renderDashboard();
    }
}

// Deletar Barbeiro
function deleteBarbeiro(id) {
    if (confirm("Tem certeza que deseja deletar este barbeiro?")) {
        barbeiros = barbeiros.filter(b => b.id !== id);
        localStorage.setItem("barbeiros", JSON.stringify(barbeiros));
        renderBarbeiros();
        renderDashboard();
    }
}

// Deletar Agendamento
function deleteAgendamento(id) {
    if (confirm("Tem certeza que deseja deletar este agendamento?")) {
        agendamentos = agendamentos.filter(a => a.id !== id);
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
        renderAgendamentos();
        renderDashboard();
    }
}
