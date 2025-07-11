document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão "Fale Conosco" na seção hero
    const contactButton = document.querySelector('.hero-section .btn-primary');

    // Seleciona o link "Nossos Serviços" abaixo da logo (agora por ID para ser mais específico)
    const servicesLinkBelowLogo = document.getElementById('scroll-to-services-link');

    // Seleciona o botão "Entre em Contato" na seção propósito
    const secondaryContactButton = document.querySelector('.proposito-text .btn-secondary');

    // Seleciona a seção de serviços
    const servicesSection = document.getElementById('servicos');
    
    // Seleciona a seção de contato
    const contactSection = document.getElementById('contato');

    // Função para rolar suavemente até a seção de contato
    function scrollToContact() {
        if (contactSection) {
            window.scrollTo({
                top: contactSection.offsetTop - 80, // Ajusta para ficar um pouco abaixo do cabeçalho fixo
                behavior: 'smooth' // Rola suavemente
            });
        }
    }

    // Função para rolar suavemente até a seção de serviços
    function scrollToServices() {
        if (servicesSection) {
            window.scrollTo({
                top: servicesSection.offsetTop - 80, // Ajusta para ficar um pouco abaixo do cabeçalho fixo
                behavior: 'smooth'
            });
        }
    }

    // Adiciona o evento de clique ao botão "Fale Conosco" na seção hero
    if (contactButton) {
        contactButton.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link
            scrollToContact();
        });
    }

    // Adiciona o evento de clique ao novo link "Nossos Serviços" abaixo da logo
    if (servicesLinkBelowLogo) {
        servicesLinkBelowLogo.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link
            scrollToServices();
        });
    }

    // Adiciona o evento de clique ao botão "Entre em Contato" na seção propósito
    if (secondaryContactButton) {
        secondaryContactButton.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link
            scrollToContact();
        });
    }


    // --- Lógica para o formulário de contato (FormSubmit AJAX) ---
    const contactForm = document.querySelector('.contact-form[data-form-submit]');
    const formStatusDiv = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const formData = new FormData(contactForm);
            const formAction = contactForm.getAttribute('action');

            try {
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Importante para o FormSubmit.co retornar JSON
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    formStatusDiv.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                    formStatusDiv.className = 'form-status success';
                    contactForm.reset(); // Limpa o formulário
                } else {
                    formStatusDiv.textContent = result.message || 'Erro ao enviar mensagem. Tente novamente.';
                    formStatusDiv.className = 'form-status error';
                }
            } catch (error) {
                console.error('Erro no envio do formulário:', error);
                formStatusDiv.textContent = 'Ocorreu um erro na conexão. Verifique sua internet ou tente mais tarde.';
                formStatusDiv.className = 'form-status error';
            }
        });
    }
});