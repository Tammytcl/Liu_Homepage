(function () {
    const me = '<span class="author-self">Jiacheng Liu</span>';

    const publications = [
        {
            venue: 'Submit to NeurIPS 2026',
            shortTitle: 'Focused Forcing',
            title: 'Focused Forcing: Content-Aware Per-Frame KV Selection for Efficient Autoregressive Video Diffusion',
            authors: `Cai, P., Zhang, E., ${me}, Lin, H., Zhang, R., Mo, W., Ma, Y., Zheng, S., Huang, J., Liu, D., &amp; Zhang, L.&dagger;`,
            image: 'assets/FocusedForcing/figures/image.png',
        },
        {
            venue: 'Submit to NeurIPS 2026',
            shortTitle: 'Dynamic Video',
            title: 'Dynamic Video Generation: Shaping Video Generation Across Time and Space',
            authors: `Zheng, S., Huang, J., ${me}, Chen, G., He, L., Lin, Y., Cai, P., &amp; Zhang, L.&dagger;`,
            image: 'assets/DynamicVideo/figures/image.png',
        },
        {
            venue: 'Submit to NeurIPS 2026',
            shortTitle: 'FreqCa',
            title: 'FreqCa: Accelerating Image Generation and Editing via Frequency-Aware Caching',
            authors: `${me}*, Cai, P.*, Zhou, Q., Lin, Y., Kong, D., Huang, B., Pan, Y., Xu, H., Zou, C., Tang, J., Zheng, S., &amp; Zhang, L.&dagger;`,
            image: 'assets/FreqCa/figures/image.png',
        },
        {
            venue: 'Submit to NeurIPS 2026',
            shortTitle: 'SpecEdit',
            title: 'SpecEdit: Training-Free Acceleration for Diffusion-Based Image Editing via Semantic Locking',
            authors: `Yan, Z.*, Zheng, S.*, Qin, H.*, Tu, X., Wang, Y., ${me}, Ren, J., Lin, Y., Cai, P., Ren, J., Zhang, X., &amp; Zhang, L.&dagger;`,
            image: 'assets/SpecEdit/figures/image.png',
        },
        {
            venue: 'Submit to NeurIPS 2026',
            shortTitle: 'Z-Cache',
            title: 'Z-Cache: Accelerating Diffusion Transformers via Self-Reflection',
            authors: `Cheng, Z.*, Wang, Z.*, ${me}*, Tu, X., Zhou, C., Chen, J., Ma, Y., Ma, Z., Ren, J., Zou, L., &amp; Zhang, L.&dagger;`,
            image: 'assets/Z-Cache/figures/image.png',
        },
        {
            venue: 'ECCV 2026',
            shortTitle: 'LinCa',
            title: 'LinCa: Accelerating Diffusion Models via Learnable Decomposed Feature Caching',
            authors: `Liu, J.*, Qin, H.*, Tu, X., ${me}, Hu, J., Yan, Z., Xie, Y., Shen, K., Ren, J., Lin, Y., Zhang, X., &amp; Zhang, L.&dagger;`,
            image: 'assets/LinCa/figures/image.png',
        },
        {
            venue: 'ECCV 2026',
            shortTitle: 'AViTS',
            title: 'AViTS: Adaptive Spatiotemporal Token Selection for Efficient Dynamic-Resolution Generation',
            authors: `Qin, H.*, Yan, Z.*, Zheng, S.*, Tu, X., ${me}, Lin, Y., Zou, C., Liu, J., Cai, P., Zhang, X., Ren, J., &amp; Zhang, L.&dagger;`,
            image: 'assets/AViTS/figures/image.png',
        },
        {
            venue: 'ECCV 2026',
            shortTitle: 'GP Cache',
            title: 'Accelerating Diffusion Transformers with Gaussian Process Rectified Feature Cache',
            authors: `Shen, Z.*, Huang, R.*, Zou, C., Zheng, S., ${me}, Cai, P., Shi, Z., Du, Y., Feng, L., Tu, X., Ren, J., Zhang, X., &amp; Zhang, L.&dagger;`,
            image: 'assets/GPCache/figures/image.png',
        },
        {
            venue: 'CVPR 2026',
            shortTitle: 'LESA',
            title: 'LESA: Learnable Stage-Aware Predictors for Diffusion Model Acceleration',
            authors: `Cai, P.*, ${me}*, Xu, H., Wang, X., Zou, C., &amp; Zhang, L.&dagger;`,
            image: 'assets/LESA/figures/image.png',
            links: [
                { label: 'Paper', href: 'https://arxiv.org/abs/2602.20497', type: 'paper' },
            ],
        },
        {
            venue: 'CVPR 2026',
            shortTitle: 'Sketch to Fresco',
            title: 'From Sketch to Fresco: Efficient Diffusion Transformer with Progressive Resolution',
            authors: `Zheng, S., Chen, G., He, L., ${me}, Lin, Y., Zou, C., &amp; Zhang, L.&dagger;`,
            image: 'assets/SketchToFresco/figures/image.png',
            links: [
                { label: 'Paper', href: 'https://arxiv.org/abs/2601.07462', type: 'paper' },
            ],
        },
        {
            venue: 'CVPR 2026',
            shortTitle: 'Data-Driven Predictor',
            title: 'Beyond Fixed Formulas: Data-Driven Linear Predictor for Efficient Diffusion Models',
            authors: `Shen, Z.*, Huang, R.*, ${me}, Zou, C., Cai, P., Zheng, S., Shi, Z., Feng, L., &amp; Zhang, L.&dagger;`,
            image: 'assets/DataDrivenPredictor/figures/image.png',
            links: [
                { label: 'Paper', href: 'https://cvpr.thecvf.com/virtual/2026/poster/40070', type: 'paper' },
            ],
        },
        {
            venue: 'CVPR 2026 Workshop',
            shortTitle: 'GameCraft-2',
            title: 'GameCraft-2: Instruction-following Interactive Game World Model',
            authors: `Tang, J.*, ${me}*, Li, J.*, Wu, L., Yang, H., Zhao, P., Shao, S., Zhang, L., &amp; Lu, Q.&dagger;`,
            image: 'assets/GameCraft-2/figures/image.png',
        },
        {
            venue: 'ICLR 2026 Oral',
            shortTitle: 'Hybrid Caching',
            title: 'Let Features Decide Their Own Solvers: Hybrid Feature Caching for Diffusion Transformers',
            authors: `Zheng, S., Chen, G., Zhou, Q., Lin, Y., He, L., Zou, C., Cai, P., ${me}, &amp; Zhang, L.&dagger;`,
            links: [
                { label: 'Paper', href: 'https://arxiv.org/abs/2510.04188', type: 'paper' },
            ],
        },
        {
            venue: 'ICLR 2026',
            shortTitle: 'HiCache',
            title: 'HiCache: Training-free Acceleration of Diffusion Models via Hermite Polynomial-based Feature Caching',
            authors: `Feng, L.*, Zheng, S.*, ${me}, Wang, X., Zou, C., Ma, Y., Chen, J., Cai, P., &amp; Zhang, L.&dagger;`,
            image: 'assets/HiCache/figures/image.png',
            links: [
                { label: 'Paper', href: 'https://arxiv.org/html/2508.16984v1', type: 'paper' },
            ],
        },
        {
            venue: 'AAAI 2026',
            shortTitle: 'WaveEx',
            title: 'WaveEx: Accelerating Flow Matching-based Speech Generation via Wavelet-guided Extrapolation',
            authors: `Liu, X.*, Gui, X.*, Ge, Z., Ge, Y., Zou, C., ${me}, Niu, Z., Zheng, Q., Xu, C., Chen, X., Xiao, T., Zhu, J., &amp; Zhang, L.&dagger;`,
            image: 'assets/WaveEx/figures/image.png',
            links: [
                { label: 'Paper', href: 'https://ojs.aaai.org/index.php/AAAI/article/view/40490', type: 'paper' },
            ],
        },
        {
            venue: 'AAAI 2026',
            shortTitle: 'Forecast Calibrate',
            title: 'Forecast then Calibrate: Feature Caching as ODE for Efficient Diffusion Transformers',
            authors: `Zheng, S., Feng, L., Wang, X., ${me}, Zou, C., Ma, Y., Chen, J., Cai, P., &amp; Zhang, L.&dagger;`,
            image: 'assets/ForecastCalibrate/figures/image.png',
            links: [
                { label: 'Paper', href: 'https://arxiv.org/abs/2508.16211', type: 'paper' },
                { label: 'GitHub', href: 'https://github.com/Shenyi-Z/Cache4Diffusion', type: 'github' },
            ],
        },
        {
            venue: 'Survey 2026',
            shortTitle: 'Cache Survey',
            title: 'A Survey on Cache Methods in Diffusion Models: Toward Efficient Multi-modal Generation',
            authors: `${me}*, Wang, X.*, Lin, Y., Wang, Z., Wang, P., Cai, P., Zhou, Q., Yan, Z., Yan, Z., Shi, Z., Zou, C., Ma, Y., &amp; Zhang, L.&dagger;`,
            image: 'assets/CacheSurvey/figures/image.png',
            links: [
                { label: 'Paper', href: 'https://arxiv.org/abs/2510.19755', type: 'paper' },
            ],
        },
        {
            venue: 'Survey 2026',
            shortTitle: 'Linear Attention Survey',
            title: 'A Survey of Linear Attention: Algorithm, Theory, Application, and Infrastructure',
            authors: `Zhang, Y., Sun, W., Sun, S., Ding, W., Xie, R., Wang, H., Chen, J., ${me}, Wang, S., Zhang, Y., Huang, Y., Wang, J., Zhao, T., Han, W., Chen, Y., Zhang, K., Li, S., Xie, R., Wang, D., Chen, J., Zhang, L., Xu, C., &amp; Wang, Y.&dagger;`,
            image: 'assets/LinearAttentionSurvey/figures/image.png',
            links: [
                { label: 'Paper', href: 'https://www.techrxiv.org/doi/abs/10.36227/techrxiv.177032877.70562626/v1', type: 'paper' },
            ],
        },
        {
            venue: 'Neurocomputing, Under Review',
            shortTitle: 'PCMamba',
            title: 'PCMamba: Parallel Convolution-Mamba Network for Medical Image Segmentation',
            authors: `${me}, Dong, L., Chen, B., Shi, J., Lu, W., Zhang, S., Yang, F.&dagger;, Li, D., &amp; Zhang, L.`,
            image: 'assets/PCMamba/figures/method.png',
            alt: 'PCMamba method figure',
            links: [
                { label: 'Paper', href: 'assets/PCMamba/PCMamba.pdf', type: 'paper' },
            ],
        },
        {
            venue: 'BSPC',
            year: '2025',
            shortTitle: 'FQCDM',
            title: 'FQCDM: Feature Quantization-Based Cardiac Image Diffusion Synthesis Model',
            authors: `Shi, J., Chen, B., ${me}, Lu, W., Zhang, S., Ma, W., Yang, F.&dagger;, &amp; Li, D.`,
            image: 'assets/FQCDM/figures/method.png',
            alt: 'FQCDM method figure',
            links: [
                { label: 'Paper', href: 'https://www.sciencedirect.com/science/article/abs/pii/S1746809425017161', type: 'paper' },
            ],
        },
        {
            venue: 'ACM MM 2025',
            shortTitle: 'SpeCa',
            title: 'SpeCa: Accelerating Diffusion Transformers with Speculative Feature Caching',
            authors: `${me}*, Zou, C.*, Lyu, Y., Li, K., Wang, S., &amp; Zhang, L.&dagger;`,
            image: 'assets/SpeCa/figures/method.png',
            alt: 'SpeCa method figure',
            links: [
                { label: 'Paper', href: 'https://arxiv.org/abs/2509.11628', type: 'paper' },
                { label: 'GitHub', href: 'https://github.com/Shenyi-Z/Cache4Diffusion', type: 'github' },
                { label: 'Project Page', href: 'https://speca2025.github.io/SpeCa2025/', type: 'project' },
            ],
        },
        {
            venue: 'ICCV 2025',
            shortTitle: 'TaylorSeer',
            title: 'From Reusing to Forecasting: Accelerating Diffusion Models with TaylorSeers',
            authors: `${me}*, Zou, C.*, Lyu, Y., Chen, J., &amp; Zhang, L.&dagger;`,
            image: 'assets/TaylorSeer/figures/method.png',
            alt: 'TaylorSeer method figure',
            links: [
                { label: 'Paper', href: 'https://doi.org/10.48550/arXiv.2503.06923', type: 'paper' },
                { label: 'GitHub', href: 'https://github.com/Shenyi-Z/TaylorSeer', type: 'github' },
                { label: 'Project Page', href: 'https://taylorseer.github.io/TaylorSeer/', type: 'project' },
                { label: 'Zhihu', href: 'https://zhuanlan.zhihu.com/p/1899104160282018548', type: 'blog' },
            ],
        },
        {
            venue: 'Preprint 2025',
            shortTitle: 'FeMo',
            title: 'Accelerate Diffusion Transformers with Feature Momentum',
            authors: `Fang, J., Zou, C., ${me}, Lyu, Y., Hu, X., &amp; Zhang, L.&dagger;`,
            image: 'assets/FeMo/figures/method.png',
            alt: 'FeMo method figure',
            links: [
                { label: 'Paper', href: 'assets/FeMo/2025 - Accelerate Diffusion Transformers with Feature Momentum.pdf', type: 'paper' },
            ],
        },
        {
            venue: 'BSPC 2025',
            shortTitle: 'PSVT',
            title: 'PSVT: Pyramid Shifted Window based Vision Transformer for Cardiac Image Segmentation',
            authors: `Zhang, X., ${me}, Xian, X., Chen, B., Li, D., Yang, F.&dagger;, &amp; Zhang, L.`,
            image: 'assets/PSVT/figures/method.png',
            alt: 'PSVT method figure',
            links: [
                { label: 'Paper', href: 'https://doi.org/10.1016/j.bspc.2024.107339', type: 'paper' },
                { label: 'GitHub', href: 'https://github.com/Tammytcl/PSVT', type: 'github' },
            ],
        },
    ];

    const uniquePublications = publications.filter((publication, index, list) => {
        return list.findIndex((item) => item.title === publication.title) === index;
    });

    function getPublicationYear(publication) {
        if (publication.year) {
            return publication.year;
        }

        const match = publication.venue.match(/\b(20\d{2})\b/);
        return match ? match[1] : '2026';
    }

    function getPublicationGroups() {
        const groups = [];
        const groupsByYear = new Map();

        uniquePublications.forEach((publication) => {
            const year = getPublicationYear(publication);
            if (!groupsByYear.has(year)) {
                const group = { year, publications: [] };
                groupsByYear.set(year, group);
                groups.push(group);
            }

            groupsByYear.get(year).publications.push(publication);
        });

        return groups;
    }

    function renderLinks(links) {
        if (!links || links.length === 0) {
            return '';
        }

        const linkItems = links.map((link) => {
            const typeClass = link.type ? ` ${link.type}` : '';
            return `<a href="${link.href}" class="link-badge${typeClass}" target="_blank" rel="noopener noreferrer">${link.label}</a>`;
        }).join('');

        return `<div class="publication-links">${linkItems}</div>`;
    }

    function renderPublication(publication) {
        const image = publication.image
            ? `<div class="imgblock"><img src="${publication.image}" alt="${publication.alt || publication.shortTitle}"></div>`
            : '';

        return [
            '<li class="publication-item">',
            image,
            `<span class="title"><span class="publication-venue">[${publication.venue}]</span> ${publication.title}</span>`,
            `<div class="info text-success italic">${publication.authors}</div>`,
            renderLinks(publication.links),
            '<div style="clear:both"></div>',
            '</li>',
        ].join('');
    }

    function renderPublicationGroup(group) {
        return [
            '<li class="publication-year-group">',
            `<details class="publication-year-details" id="publication-year-${group.year}">`,
            '<summary class="publication-year-summary">',
            `<span class="publication-year-title">${group.year}</span>`,
            `<span class="publication-year-count">${group.publications.length} publications</span>`,
            '</summary>',
            `<ol class="publication-year-list">${group.publications.map(renderPublication).join('')}</ol>`,
            '</details>',
            '</li>',
        ].join('');
    }

    function renderPublicationList() {
        document.querySelectorAll('.publications > ol').forEach((list) => {
            list.innerHTML = getPublicationGroups().map(renderPublicationGroup).join('');
        });
    }

    function renderPublicationToc() {
        const submenu = document.querySelector('.pub-submenu');
        if (!submenu) {
            return;
        }

        submenu.innerHTML = getPublicationGroups().map((group) => {
            return `<a href="#publication-year-${group.year}" class="toc-sublink">${group.year}</a>`;
        }).join('');
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderPublicationList();
        renderPublicationToc();
    });
}());
