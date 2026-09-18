$(document).ready(function () {
	const skills = [
		{
			name: 'Python',
			level: 'Средний уровень.',
		},
		{
			name: 'C++',
			level: 'Базовый уровень.',
		},
		{
			name: 'Java',
			level: 'Базовый уровень.',
		},
		{
			name: 'JavaScript',
			level: 'Базовый уровень.',
		},
	]

	let currentSkill = 0

	function showSkill() {
		$('#skill-name').text(skills[currentSkill].name)
		$('#skill-level').text(skills[currentSkill].level)

		$('.skill-card').hide().fadeIn(300)
	}

	function nextSkill() {
		currentSkill = (currentSkill + 1) % skills.length
		showSkill()
	}

	function prevSkill() {
		currentSkill = (currentSkill - 1 + skills.length) % skills.length
		showSkill()
	}

	$('#next-skill').on('click', nextSkill)
	$('#prev-skill').on('click', prevSkill)

	setInterval(nextSkill, 4000)

	$('.menu-button').on('click', function () {
		$('nav').slideToggle(300)
	})

	$('.nav-list a').on('click', function () {
		if ($(window).width() <= 767) {
			$('nav').slideUp(300)
		}
	})

	$.getJSON('data/portfolio.json')
		.done(function (works) {
			const $portfolioList = $('#portfolio-list')

			$portfolioList.empty()

			$.each(works, function (index, work) {
				const card = `
          <li>
            <article class="work-card">
              <h3>${work.title}</h3>
              <p>${work.description}</p>
              <a
                href="${work.url}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть на GitHub
              </a>
            </article>
          </li>
        `

				$portfolioList.append(card)
			})

			$('#portfolio-list li').hide().fadeIn(500)
		})
		.fail(function () {
			$('#portfolio-list').html(
				"<li class='loading-message'>Не удалось загрузить работы из JSON.</li>",
			)
		})

	$('.open-modal-button').on('click', function () {
		$('#contact-modal').fadeIn(300)
	})

	$('.modal-close').on('click', function () {
		$('#contact-modal').fadeOut(300)
	})

	$('#contact-modal').on('click', function (event) {
		if (event.target === this) {
			$('#contact-modal').fadeOut(300)
		}
	})

	$(document).on('keydown', function (event) {
		if (event.key === 'Escape') {
			$('#contact-modal').fadeOut(300)
		}
	})

	$('#contact-form').on('submit', function (event) {
		event.preventDefault()

		const name = $('#name').val().trim()
		const email = $('#email').val().trim()
		const message = $('#message').val().trim()
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		$('#form-error').text('')
		$('#form-success').text('')

		if (name === '' || email === '' || message === '') {
			$('#form-error').text('Заполните все поля формы.')
			return
		}

		if (!emailPattern.test(email)) {
			$('#form-error').text('Введите корректный email.')
			return
		}

		$.ajax({
			url: 'https://jsonplaceholder.typicode.com/posts',
			method: 'POST',
			data: {
				name: name,
				email: email,
				message: message,
			},
		})
			.done(function () {
				$('#form-success').text('Сообщение успешно отправлено!')
				$('#contact-form')[0].reset()

				setTimeout(function () {
					$('#contact-modal').fadeOut(300)
				}, 1500)
			})
			.fail(function () {
				$('#form-error').text('Ошибка отправки. Попробуйте ещё раз.')
			})
	})

	$(window).on('scroll', function () {
		const scrollPosition = $(window).scrollTop()

		if (scrollPosition > 300) {
			$('.scroll-top-button').fadeIn(200)
		} else {
			$('.scroll-top-button').fadeOut(200)
		}

		$('main section').each(function () {
			const sectionTop = $(this).offset().top - 150
			const sectionBottom = sectionTop + $(this).outerHeight()
			const sectionId = $(this).attr('id')

			if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
				$('.nav-list a').removeClass('active')
				$('.nav-list a[href="#' + sectionId + '"]').addClass('active')
			}
		})
	})

	$('.scroll-top-button').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: 0,
			},
			500,
		)
	})
})
