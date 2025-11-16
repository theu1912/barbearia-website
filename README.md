# Barbearia Premium - Website

Um website completo para uma barbearia, desenvolvido em HTML, CSS e JavaScript puro, com funcionalidades de landing page pública e área administrativa.

## 📋 Características

### Página Pública (index.html)
- **Landing Page Responsiva**: Design moderno com tema escuro e destaque em âmbar
- **Navegação Interna (SPA)**: Transição suave entre seções sem recarregar a página
- **Seções Principais**:
  - Home: Hero section com chamada para ação
  - Serviços: Exibição de todos os serviços com preços
  - Barbeiros: Perfil dos profissionais
  - Agendamento: Formulário para agendar serviços
  - Contato: Informações de telefone, endereço e horário

### Área Administrativa (admin.html)
- **Autenticação**: Login simples com credenciais (admin / admin123)
- **Dashboard**: Resumo com contadores de serviços, barbeiros e agendamentos
- **CRUD Completo**:
  - Gerenciar Serviços (Criar, Listar, Deletar)
  - Gerenciar Barbeiros (Criar, Listar, Deletar)
  - Gerenciar Agendamentos (Listar, Deletar)
- **Persistência**: Todos os dados são salvos em LocalStorage

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização responsiva com Flexbox e Grid
- **JavaScript (ES6+)**: Lógica da aplicação
- **LocalStorage**: Persistência de dados no navegador

## 📁 Estrutura de Arquivos

```
barbearia-website/
├── index.html          # Página pública principal
├── admin.html          # Página administrativa
├── style.css           # Estilos globais
├── app.js              # Lógica da página pública
├── admin.js            # Lógica da área administrativa
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Abrir o Site
Simplesmente abra o arquivo `index.html` em um navegador web moderno.

```bash
# Opção 1: Abrir diretamente
open index.html

# Opção 2: Usar um servidor local (Python)
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

### 2. Acessar a Área Administrativa
Clique em "Área Admin" no header ou acesse `admin.html` diretamente.

**Credenciais de Acesso:**
- Usuário: `admin`
- Senha: `admin123`

### 3. Funcionalidades

#### Na Página Pública:
- Navegue entre as seções usando o menu
- Clique em "Conheça Nossos Serviços" para ver todos os serviços
- Clique em "Agende Agora" para preencher o formulário de agendamento
- Visualize informações de contato e depoimentos

#### Na Área Administrativa:
- **Dashboard**: Visualize o resumo de dados
- **Serviços**: Adicione novos serviços ou delete existentes
- **Barbeiros**: Adicione novos barbeiros ou delete existentes
- **Agendamentos**: Visualize e delete agendamentos recebidos

## 💾 Dados Persistidos

Todos os dados são armazenados no **LocalStorage** do navegador:
- `servicos`: Lista de serviços cadastrados
- `barbeiros`: Lista de barbeiros cadastrados
- `agendamentos`: Lista de agendamentos recebidos
- `adminToken`: Token de autenticação do admin

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🎨 Paleta de Cores

- **Cor Primária**: #f97316 (Âmbar)
- **Cor Primária Escura**: #ea580c
- **Fundo Escuro**: #0f172a
- **Fundo Mais Escuro**: #020617
- **Card**: #1e293b
- **Texto Primário**: #ffffff
- **Texto Secundário**: #cbd5e1
- **Borda**: #334155

## 🔐 Segurança

**Nota Importante**: Este é um projeto de demonstração. Para um site em produção:
- Implemente autenticação real no backend
- Use HTTPS para comunicação segura
- Não armazene dados sensíveis no LocalStorage
- Implemente validação de dados no servidor

## 📝 Informações da Barbearia

- **Nome**: Barbearia Premium
- **Telefone**: (41) 98765-4321
- **Endereço**: Rua XV de Novembro, 1234 - Curitiba, PR
- **Horário**: Seg-Sex: 9h-19h | Sab: 9h-17h

## 🚀 Próximas Melhorias

- [ ] Integração com WhatsApp para confirmação de agendamentos
- [ ] Galeria de fotos dos trabalhos realizados
- [ ] Sistema de notificações por email
- [ ] Integração com calendário para visualizar horários disponíveis
- [ ] Backend com banco de dados para persistência real

## 📄 Licença

Este projeto é fornecido como está para fins educacionais e comerciais.

---

**Desenvolvido com ❤️ para Barbearia Premium**
