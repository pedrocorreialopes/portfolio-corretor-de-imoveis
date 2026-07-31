# 🏠 Portfólio de Corretor de Imóveis - Edson Mendes da Silva

Website profissional, premium e responsivo para o corretor de imóveis **Edson Mendes da Silva**, atuando em **Fortaleza/CE e Região Metropolitana**.

> **Slogan:** Realizando o sonho da casa própria.  
> **Criado e desenvolvido por:** Pedro Correia Lopes Filho

---

## 📋 Resumo do Projeto

Projeto digital completo, otimizado para **conversão, SEO, acessibilidade e performance**, com navegação intuitiva, animações suaves, integração com WhatsApp, redes sociais, agendamento e apresentação de portfólio de imóveis.

---

## ✅ Funcionalidades Implementadas

### Páginas e Seções
- **Home** com hero impactante, estatísticas, diferenciais, serviços, portfólio em destaque, depoimentos, FAQ e CTA.
- **Sobre** com história, missão, visão, valores e números da trajetória.
- **Serviços** com descrições detalhadas e processo de atendimento.
- **Portfólio** com grid de imóveis, filtros e detalhes individuais.
- **Galeria** com fotos ampliadas em lightbox acessível.
- **FAQ** com accordion e schema markup.
- **Depoimentos** com formulário para envio de avaliação.
- **Contato** com formulário, mapa, telefone, e-mail, WhatsApp e redes sociais.
- **Agendamento** com formulário de visita e apresentação de formas de pagamento.
- **Página de detalhe do imóvel** (`imovel.html?id=...`) carregada dinamicamente.

### Interatividade e UX
- Menu fixo, responsivo e acessível (mobile hambúrguer com overlay).
- Scroll reveal com suporte a `prefers-reduced-motion`.
- Contadores animados, cards com hover, lightbox acessível por teclado.
- FAQ accordion com ARIA.
- Formulários com validação em tempo real, máscara de telefone e mensagens de status.
- Botões de WhatsApp com mensagens personalizadas por imóvel.
- Foco visível, skip link, semântica HTML5 e roles ARIA.

### SEO e Performance
- Meta tags completas (title, description, keywords, robots, canonical, viewport, theme-color).
- Open Graph e Twitter Cards em todas as páginas.
- Schema.org JSON-LD: WebSite, LocalBusiness, Person, AboutPage, FAQPage, ContactPage, RealEstateListing, ReviewPage.
- Headings hierarquizados, alt text em imagens, links internos, lazy loading.
- Google Fonts e Font Awesome com preconnect/preload.
- CSS organizado, comentado e responsivo (Mobile First).
- JavaScript modular em um único arquivo principal, com boas práticas de acessibilidade.

### Dados Dinâmicos (API RESTful de Tabelas)
- Tabela `properties` para catálogo de imóveis.
- Tabela `testimonials` para depoimentos.
- Tabelas `contacts`, `appointments`, `newsletter` para captura de leads via formulários.

---

## 🚀 Funcionalidades de Entrada (URIs)

| Página | Caminho | Parâmetros |
|--------|---------|------------|
| Home | `/index.html` | - |
| Sobre | `/pages/sobre.html` | - |
| Serviços | `/pages/servicos.html` | - |
| Portfólio | `/pages/portfolio.html` | - |
| Galeria | `/pages/galeria.html` | - |
| FAQ | `/pages/faq.html` | - |
| Depoimentos | `/pages/depoimentos.html` | - |
| Contato | `/pages/contato.html` | - |
| Agendamento | `/pages/agendamento.html` | - |
| Detalhe do imóvel | `/pages/imovel.html` | `?id={uuid-do-imovel}` |

---

## 🗂️ Estrutura de Pastas

```
/
├── index.html              # Página inicial
├── css/
│   └── style.css           # Estilos principais (premium, responsivo, acessível)
├── js/
│   └── main.js             # JavaScript principal (interatividade, API, formulários)
├── pages/
│   ├── sobre.html
│   ├── servicos.html
│   ├── portfolio.html
│   ├── galeria.html
│   ├── faq.html
│   ├── depoimentos.html
│   ├── contato.html
│   ├── agendamento.html
│   └── imovel.html         # Detalhe do imóvel (dinâmico)
└── README.md
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico e acessível
- **CSS3** com variáveis, flexbox, grid, animações e responsividade
- **JavaScript** vanilla (sem frameworks) — leve, modular e performático
- **Google Fonts** (Inter)
- **Font Awesome** (ícones)
- **API RESTful de Tabelas** para persistência de dados
- **Schema.org / JSON-LD** para rich snippets
- **Open Graph / Twitter Cards** para compartilhamento social

---

## ⚠️ Nota sobre Backend e Pagamentos

Você solicitou **Node.js + MySQL** no backend e **sistema de pagamentos**. Como este ambiente é de **site estático**, não é possível criar servidor Node.js ou conectar diretamente ao MySQL. A persistência de dados é feita pela **API RESTful de Tabelas** disponível na plataforma.

### Recomendações para expansão futura:
1. **Backend real (Node.js + MySQL):** para processar pagamentos, integrar gateway (Stripe, Mercado Pago, PagSeguro), gerenciar autenticação e relatórios avançados.
2. **Sistema de pagamentos:** atualmente o site apresenta as formas de pagamento aceitas (financiamento, consórcio, Casa Verde e Amarela, etc.). A **integração com gateway de pagamento** requer backend seguro e não pode ser implementada apenas no frontend.
3. **Integração WhatsApp:** funcional via links `https://wa.me/...` (substituir o número fictício `5585987654321` pelo número real do corretor no arquivo `js/main.js`).
4. **Integração redes sociais:** links configurados no `js/main.js` (`data-social`) para Instagram, Facebook, LinkedIn e YouTube.

---

## 📝 Configurações Importantes

### Alterar número do WhatsApp e dados de contato
Edite o arquivo `js/main.js` e ajuste as constantes no objeto `CONFIG`:

```javascript
const CONFIG = {
  whatsappNumber: '5585XXXXXXXXX',     // Substitua pelo número real com DDD
  whatsappMessage: 'Olá, Edson! ...',
  email: 'contato@edsonmendesimoveis.com.br',
  phone: '+55 85 XXXXX-XXXX',
  // ...
};
```

### Alterar imagens e dados de imóveis
Os imóveis são carregados da tabela `properties`. Para adicionar, editar ou remover imóveis, utilize a **API RESTful de Tabelas** ou a interface de gerenciamento de tabelas do projeto.

### Alterar domínio e URLs
Substitua `https://edsonmendesimoveis.com.br` pelos links reais do domínio em todos os arquivos HTML (canonical, Open Graph, schema, etc.).

---

## 🌐 Publicação / Deploy

Para publicar o site e torná-lo acessível online, utilize a **aba Publish (Publicar)** do projeto. A publicação está fora do escopo de edição de código e deve ser feita pelo painel de publicação da plataforma, que fornecerá a URL do site ao vivo.

---

## ♿ Acessibilidade

- Skip link para pular para conteúdo principal.
- Navegação completa por teclado (Tab, Enter, Escape, setas no lightbox).
- Foco visível em todos os elementos interativos.
- ARIA labels, roles e estados (`aria-expanded`, `aria-pressed`, `aria-live`, etc.).
- Textos alternativos em imagens.
- Semântica HTML5 (header, nav, main, section, article, footer).
- Respeito a `prefers-reduced-motion`.
- Contraste adequado entre texto e fundo.

---

## 📊 Modelos de Dados (Tabelas)

### `properties` - Imóveis
- id, title, description, location, type, category, price, bedrooms, bathrooms, area, parking, image_url, featured

### `appointments` - Agendamentos
- id, name, email, phone, property_interest, preferred_date, preferred_time, message, status

### `contacts` - Leads de contato
- id, name, email, phone, subject, message, status

### `testimonials` - Depoimentos
- id, name, email, text, rating, role, avatar_url, approved

### `newsletter` - Inscrições
- id, email, active

---

## 📱 Responsividade

- Mobile First (320px+).
- Tablet (768px+).
- Desktop (1024px+).
- Ultra-wide (1440px+).

---

## 🔮 Próximos Passos Recomendados

1. Substituir número de WhatsApp e e-mail pelos dados reais do corretor.
2. Comprar e configurar o domínio real (`edsonmendesimoveis.com.br` ou similar).
3. Trocar as imagens de exemplo por fotos profissionais reais dos imóveis.
4. Adicionar mais imóveis e depoimentos via tabelas.
5. Implementar backend Node.js + MySQL e integração com gateway de pagamentos (fora do escopo do site estático).
6. Configurar Google Analytics / Google Tag Manager e Pixel de conversão.
7. Criar blog para conteúdo SEO e geração de tráfego orgânico.
8. Integrar feed de imóveis via MLS ou CRM imobiliário.

---

## 📞 Contato do Profissional (exemplo)

- **Nome:** Edson Mendes da Silva
- **Telefone:** (85) 98765-4321
- **E-mail:** contato@edsonmendesimoveis.com.br
- **Cidade de atuação:** Fortaleza / CE / Brasil
- **Região:** Fortaleza e Região Metropolitana

---

**Projeto finalizado e pronto para uso.** Para publicar, acesse a aba **Publish**.
