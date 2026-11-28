document.documentElement.classList.add('js');

(function () {
    var links = document.querySelectorAll('header nav a');
    var sections = document.querySelectorAll('main section[id]');
    var topBtn = document.querySelector('.ke-atas');

    // Tandai menu aktif
    if ('IntersectionObserver' in window) {
        var nav = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                links.forEach(function (a) {
                    var aktif = a.getAttribute('href') === '#' + e.target.id;
                    if (aktif) {
                        a.setAttribute('aria-current', 'true');
                        a.scrollIntoView({ inline: 'center', block: 'nearest' });
                    } else {
                        a.removeAttribute('aria-current');
                    }
                });
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(function (s) { nav.observe(s); });

        // Animasi muncul saat di-scroll
        var rev = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('terlihat'); rev.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.card, .rantai, .dalil, .tabs').forEach(function (el) {
            el.classList.add('muncul'); rev.observe(el);
        });
    }

    // Tombol kembali ke atas
    window.addEventListener('scroll', function () {
        topBtn.classList.toggle('tampil', window.scrollY > 600);
    }, { passive: true });

    // Tab sumber hukum
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab-list [role="tab"]'));
    function pilih(i, fokus) {
        tabs.forEach(function (t, k) {
            var on = i === k;
            t.setAttribute('aria-selected', on);
            t.tabIndex = on ? 0 : -1;
            document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
        });
        if (fokus) tabs[i].focus();
    }
    if (tabs.length) {
        pilih(0);
        tabs.forEach(function (t, i) {
            t.addEventListener('click', function () { pilih(i); });
            t.addEventListener('keydown', function (e) {
                var k = e.key, n = tabs.length, to = null;
                if (k === 'ArrowDown' || k === 'ArrowRight') to = (i + 1) % n;
                else if (k === 'ArrowUp' || k === 'ArrowLeft') to = (i - 1 + n) % n;
                else if (k === 'Home') to = 0;
                else if (k === 'End') to = n - 1;
                if (to !== null) { e.preventDefault(); pilih(to, true); }
            });
        });
    }
})();
