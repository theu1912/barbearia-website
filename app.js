// parte da Barbearia
const barbearia = {
    nome: "Barbearia Premium",
    telefone: "(41) 98765-4321",
    endereco: "Rua XV de Novembro, 1234 - Curitiba, PR",
    horario: "Seg-Sex: 9h-19h | Sab: 9h-17h",
    ddd: "41"
};

const servicos = [
    { id: 1, nome: "Corte Clássico", preco: 50, duracao: 30, icon: "✂️" },
    { id: 2, nome: "Barba Completa", preco: 40, duracao: 30, icon: "🧔" },
    { id: 3, nome: "Corte + Barba", preco: 80, duracao: 45, icon: "💈" },
    { id: 4, nome: "Pigmentação", preco: 60, duracao: 30, icon: "🎨" }
];

const barbeiros = [
    { id: 1, nome: "Carlos Silva", especialidade: "Especialista em Cortes Modernos" },
    { id: 2, nome: "João Santos", especialidade: "Mestre em Barba Clássica" },
    { id: 3, nome: "Pedro Costa", especialidade: "Designer de Sobrancelhas" }
];

const depoimentos = [
    { nome: "Lucas M.", texto: "Melhor barbearia da região! Profissionais excelentes.", rating: 5 },
    { nome: "Felipe R.", texto: "Ambiente acolhedor e atendimento de primeira qualidade.", rating: 5 },
    { nome: "Bruno T.", texto: "Voltei várias vezes, nunca me decepcionou.", rating: 5 }
];

// Estado da aplicação
let currentSection = "home";
let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

// Inicialização aplicação
document.addEventListener("DOMContentLoaded", () => {
    renderApp();
});

// Renderizar aplicação
function renderApp() {
    const app = document.getElementById("app");
    app.innerHTML = getAppHTML();
    attachEventListeners();
}

// HTML aplicação
function getAppHTML() {
    return `
        <header>
            <nav class="container">
                <div class="logo" onclick="navigateTo('home')">
                    <span class="logo-icon">✂️</span>
                    ${barbearia.nome}
                </div>
                <div class="nav-links">
                    <button onclick="navigateTo('services')">Serviços</button>
                    <button onclick="navigateTo('barbers')">Barbeiros</button>
                    <button onclick="navigateTo('home')">Contato</button>
                    <a href="admin.html" class="btn btn-outline">Área Admin</a>
                </div>
            </nav>
        </header>

        <main>
            ${getSectionHTML()}
        </main>

        <footer>
            <div class="container">
                <p>&copy; 2025 ${barbearia.nome}. Todos os direitos reservados.</p>
            </div>
        </footer>
    `;
}

// recebe HTML da seção atual
function getSectionHTML() {
    switch (currentSection) {
        case "services":
            return getServicesHTML();
        case "barbers":
            return getBarbersHTML();
        case "booking":
            return getBookingHTML();
        default:
            return getHomeHTML();
    }
}

// Seção Home
function getHomeHTML() {
    return `
        <section class="section active">
            <div class="hero">
                <h1>${barbearia.nome}</h1>
                <p>Onde tradição encontra modernidade. Experimente o melhor em cuidados pessoais masculinos.</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="navigateTo('services')">Conheça Nossos Serviços</button>
                    <button class="btn btn-outline" onclick="navigateTo('booking')">Agende Agora</button>
                </div>
            </div>

            <div class="contact-section">
                <h2>Entre em Contato</h2>
                <div class="contact-grid">
                    <div class="contact-card">
                        <div class="contact-icon">📞</div>
                        <h3>Telefone</h3>
                        <p>${barbearia.telefone}</p>
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon">📍</div>
                        <h3>Endereço</h3>
                        <p>${barbearia.endereco}</p>
                    </div>
                    <div class="contact-card">
                        <div class="contact-icon">🕐</div>
                        <h3>Horário</h3>
                        <p>${barbearia.horario}</p>
                    </div>
                </div>
            </div>

            <div class="testimonials-section">
                <h2>O Que Nossos Clientes Dizem</h2>
                <div class="testimonials-grid">
                    ${depoimentos.map(dep => `
                        <div class="testimonial-card">
                            <div class="stars">
                                ${Array(dep.rating).fill().map(() => '<span class="star">⭐</span>').join('')}
                            </div>
                            <p class="testimonial-text">"${dep.texto}"</p>
                            <p class="testimonial-author">${dep.nome}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

// Seção Serviços
function getServicesHTML() {
    return `
        <section class="section active">
            <div class="container" style="padding-top: 2rem; padding-bottom: 2rem;">
                <button class="btn btn-outline btn-back" onclick="navigateTo('home')">← Voltar</button>
                <h2 style="text-align: center; font-size: 2.25rem; margin-bottom: 2rem;">Nossos Serviços</h2>
                <div class="grid">
                    ${servicos.map(servico => `
                        <div class="card">
                            <div class="card-icon">${servico.icon}</div>
                            <h3>${servico.nome}</h3>
                            <div class="card-price">R$ ${servico.preco.toFixed(2)}</div>
                            <p class="card-specialty">${servico.duracao} min</p>
                            <button class="btn btn-primary" onclick="navigateTo('booking')">Agendar</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

// Seção Barbeiros
function getBarbersHTML() {
    return `
        <section class="section active">
            <div class="container" style="padding-top: 2rem; padding-bottom: 2rem;">
                <button class="btn btn-outline btn-back" onclick="navigateTo('home')">← Voltar</button>
                <h2 style="text-align: center; font-size: 2.25rem; margin-bottom: 2rem;">Nossos Barbeiros</h2>
                <div class="grid">
                    ${barbeiros.map(barbeiro => `
                        <div class="card">
                            <div class="avatar">👤</div>
                            <h3>${barbeiro.nome}</h3>
                            <p class="card-specialty">${barbeiro.especialidade}</p>
                            <button class="btn btn-primary" onclick="navigateTo('booking')">Agendar com ${barbeiro.nome.split(' ')[0]}</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

// Seção Agendamento
function getBookingHTML() {
    return `
        <section class="section active">
            <div class="container" style="padding-top: 2rem; padding-bottom: 2rem;">
                <button class="btn btn-outline btn-back" onclick="navigateTo('home')">← Voltar</button>
                <h2 style="text-align: center;">Agende Seu Horário</h2>
                <div class="booking-form" style="max-width: 600px; margin: 2rem auto;">
                    <form id="bookingForm">
                        <div class="form-group">
                            <label>Seu Nome</label>
                            <input type="text" id="clientName" placeholder="Digite seu nome" required>
                        </div>

                        <div class="form-group">
                            <label>Telefone</label>
                            <input type="tel" id="clientPhone" placeholder="(41) 9XXXX-XXXX" required>
                        </div>

                        <div class="form-group">
                            <label>Serviço</label>
                            <select id="servicoSelect" required>
                                <option value="">Selecione um serviço</option>
                                ${servicos.map(s => `<option value="${s.nome}">${s.nome} - R$ ${s.preco.toFixed(2)}</option>`).join('')}
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Barbeiro</label>
                            <select id="barbeiroSelect" required>
                                <option value="">Selecione um barbeiro</option>
                                ${barbeiros.map(b => `<option value="${b.nome}">${b.nome}</option>`).join('')}
                            </select>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Data</label>
                                <input type="date" id="dataAgendamento" required>
                            </div>
                            <div class="form-group">
                                <label>Hora</label>
                                <input type="time" id="horaAgendamento" required>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.75rem;">Confirmar Agendamento</button>
                    </form>

                    <div class="booking-info">
                        ℹ️ Seu agendamento será confirmado em breve. Você receberá uma mensagem de confirmação no telefone fornecido.
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Navegação
function navigateTo(section) {
    currentSection = section;
    renderApp();
    window.scrollTo(0, 0);
}

// Anexar event listeners
function attachEventListeners() {
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", handleBookingSubmit);
    }
}

// Lidar com envio de formulário de agendamento
function handleBookingSubmit(e) {
    e.preventDefault();

    const agendamento = {
        id: Date.now(),
        clientName: document.getElementById("clientName").value,
        clientPhone: document.getElementById("clientPhone").value,
        servico: document.getElementById("servicoSelect").value,
        barbeiro: document.getElementById("barbeiroSelect").value,
        data: document.getElementById("dataAgendamento").value,
        hora: document.getElementById("horaAgendamento").value,
        dataCriacao: new Date().toLocaleString("pt-BR")
    };

    agendamentos.push(agendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    alert(`✅ Agendamento confirmado!\n\nCliente: ${agendamento.clientName}\nBarbeiro: ${agendamento.barbeiro}\nServiço: ${agendamento.servico}\nData: ${agendamento.data} às ${agendamento.hora}\n\nEntraremos em contato em breve!`);

    document.getElementById("bookingForm").reset();
    navigateTo("home");
}
