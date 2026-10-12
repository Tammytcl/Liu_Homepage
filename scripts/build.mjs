import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stylesheetVersion = createHash('sha256').update(fs.readFileSync(path.join(root, 'static/css/academic.css'))).digest('hex').slice(0, 12);
const publications = JSON.parse(fs.readFileSync(path.join(root, 'data/publications.json'), 'utf8'));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const authorText = value => escape(value).replaceAll('Jiacheng Liu', '<strong>Jiacheng Liu</strong>');
const link = (label, href) => `<a href="${escape(href)}">${escape(label)}</a>`;
const labels = {
    zh: {
        lang: 'zh-CN', title: '留嘉城 · Jiacheng Liu', description: '留嘉城，上海交通大学人工智能学院博士生。研究大语言模型后训练与智能体、高效多模态生成及交互式世界模型。',
        nav: ['简介', '研究方向', '实习', '项目介绍', '代表项目', '其他论文'],
        affiliation: '上海交通大学 · 人工智能学院 · 博士生',
        advisor: '指导教师', advisorName: '张林峰教授',
        bio: '我是<a href="https://www.sjtu.edu.cn/">上海交通大学</a>人工智能学院 2026 级博士生。我的研究围绕生成模型与智能体的效率和能力展开，重点关注大语言模型后训练与智能体学习、高效多模态生成，以及交互式世界模型。',
        opportunities: '欢迎 LLM 后训练、智能体、多模态生成与世界模型方向的研究实习和合作交流。',
        research: '研究方向', internships: '实习经历', overview: '项目介绍', projects: '代表项目', others: '其他论文',
        interests: [
            '<strong>大语言模型后训练与智能体：</strong>On-Policy Distillation、跨 Tokenizer 与异构 MoE 知识迁移、多轮 Coding Agent 训练与任务评测。',
            '<strong>高效多模态生成：</strong>特征预测与缓存、自适应计算、视频 KV 缓存与量化、少步蒸馏。',
            '<strong>交互式世界模型：</strong>指令驱动的视频生成、动作响应与长时序一致性。'
        ],
        experience: [
            ['无尽前沿（Endless Frontier）', '2026.09–至今', 'LLM 基模组 · 后训练实习生 · 上海', '开展 On-Policy Distillation 与异构 MoE 知识蒸馏研究，关注跨模型知识迁移和多轮 Coding Agent 训练。'],
            ['腾讯混元', '2025.07–2026.06', '多模态模型部 · 世界模型基模组 · 青云计划研究实习生 · 上海', '参与 Hunyuan-GameCraft-2 的交互视频数据、教师模型 SFT、Self-Forcing / DMD 少步蒸馏、强化学习优化与评测。']
        ],
        overviews: [
            ['大语言模型后训练与智能体', [
                { label: 'Cross-Tokenizer OPD：', text: '我关注教师与学生使用不同 Tokenizer 时的知识迁移，研究如何在学生自主生成的轨迹上构造有效监督。围绕跨词表的概率对齐与事件补全，探索学生生成教师 Token 的部分前缀后，如何对兼容的后续补全集合施加监督，避免将概率任意分配给单个学生 Token，并将这一方法拓展到异构 MoE 的蒸馏。' },
                { label: 'MOPD：', text: '我开展基于 MOPD 的多能力合并训练，在小模型上进行数学（Math）、代码（Code）与指令遵循（IF）能力的合并，也参与面向工业代码与多模态任务的大规模模型合版。关注不同任务能力的协同迁移、合并后的能力保持，以及训练与评测流程的组织，积累跨任务、跨规模的模型合并经验。' },
                { label: 'Agentic OPD：', text: '我关注多轮智能体在推理、工具调用与环境反馈中的蒸馏学习，研究训练基础设施与监督分配的协同设计。通过轮级流式异步训练，及时消费学生交互过程中产生的教师监督，减少长轨迹带来的等待；同时利用任务执行结果持续更新 Critic，调整不同交互轮次的蒸馏强度，使监督分配随学生能力变化而更新。' }
            ]],
            ['高效多模态生成', [
                '围绕图像、视频与语音生成中的重复计算，我研究如何利用特征随时间步、网络层级和频段变化的规律，减少昂贵的模型计算。相关工作覆盖免训练特征外推、预测与校准、可学习及阶段感知预测、自适应验证和计算分配，并从理论与综述角度梳理缓存方法及高效注意力机制。核心问题是：哪些计算可以复用或预测，何时需要重新计算，以及如何在加速时保留生成质量。',
                '这一研究主线也延伸到生成过程本身的计算组织，包括渐进分辨率、时空 Token 选择、噪声轨迹选择，以及自回归视频中的 KV 选择与量化；在图像编辑中关注语义保持与局部修改，在语音生成中探索频域与小波引导的外推。通过结合特征、空间、时间和任务层面的计算策略，探索适用于多种生成与编辑任务的效率方法。'
            ]],
            ['交互式世界模型', [
                '我关注生成模型如何从单向的视频合成走向可控制、可持续交互的环境建模：既响应自然语言指令和玩家动作，也在长时序生成中维持场景、状态与历史的一致性。相关工作贯穿交互视频数据构建、清洗与标注，交互记忆教师模型 SFT，以及指令跟随、动作响应和时序一致性的评测。',
                '在训练与推理方面，基于 Self-Forcing 与 DMD 开展少步蒸馏，并结合强化学习优化长程生成稳定性与视觉质量。研究重点是将控制能力、交互记忆与生成效率一起考虑，使世界模型能够在持续反馈中生成连贯的交互过程。'
            ]]
        ],
        overviewNote: '围绕知识迁移、生成效率与交互能力展开的研究。',
        selectedNote: '* 表示同等贡献，† 表示通讯作者。',
        groups: [
            ['大语言模型后训练', ['ESCD']],
            ['高效多模态生成', ['FreqCa', 'LESA', 'SpeCa', 'TaylorSeer']],
            ['交互式世界模型', ['GameCraft-2']]
        ],
        otherNote: '代表项目之外的合作论文、综述与早期研究，按年份展开。',
        roleFirst: '一作', roleEqual: '共同一作', underReview: '在审',
        paper: '论文', code: '代码', project: '项目', footer: '更新于 2026 年 10 月'
    },
    en: {
        lang: 'en', title: 'Jiacheng Liu (留嘉城)', description: 'Jiacheng Liu, Ph.D. student at Shanghai Jiao Tong University. LLM post-training and agents, efficient multimodal generation, and interactive world models.',
        nav: ['About', 'Research', 'Internships', 'Project Overview', 'Selected Work', 'Other Papers'],
        affiliation: 'Ph.D. Student · School of Artificial Intelligence · SJTU',
        advisor: 'Advisor', advisorName: 'Prof. Linfeng Zhang',
        bio: 'I am a first-year Ph.D. student (2026 cohort) at the School of Artificial Intelligence, <a href="https://en.sjtu.edu.cn/">Shanghai Jiao Tong University</a>. My research focuses on the efficiency and capabilities of generative models and agents, spanning LLM post-training and agent learning, efficient multimodal generation, and interactive world models.',
        opportunities: 'I welcome research internship and collaboration opportunities in LLM post-training, agents, multimodal generation, and world models.',
        research: 'Research Interests', internships: 'Internships', overview: 'Project Overview', projects: 'Selected Projects', others: 'Other Publications',
        interests: [
            '<strong>LLM post-training and agents:</strong> on-policy distillation, cross-tokenizer and heterogeneous MoE knowledge transfer, multi-turn coding-agent training and evaluation.',
            '<strong>Efficient multimodal generation:</strong> feature prediction and caching, adaptive computation, video KV caching and quantization, and few-step distillation.',
            '<strong>Interactive world models:</strong> instruction-driven video generation, action response, and long-horizon consistency.'
        ],
        experience: [
            ['Endless Frontier', 'Sep 2026–Present', 'LLM Foundation Model Team · Post-training Intern · Shanghai', 'Research on on-policy distillation and heterogeneous MoE distillation, with a focus on cross-model knowledge transfer and multi-turn coding agents.'],
            ['Tencent Hunyuan', 'Jul 2025–Jun 2026', 'World Model Team · Qingyun Research Intern · Shanghai', 'Contributed to Hunyuan-GameCraft-2 through interactive video data, teacher-model SFT, Self-Forcing / DMD few-step distillation, reinforcement learning, and evaluation.']
        ],
        overviews: [
            ['LLM Post-training and Agents', [
                { label: 'Cross-Tokenizer OPD:', text: 'I study knowledge transfer between teachers and students with different tokenizers, focusing on useful supervision along student-generated trajectories. My work explores cross-vocabulary probability alignment and event completion: after a student generates a partial prefix of a teacher token, supervision targets compatible completion sets rather than arbitrary probability splits among individual student tokens. I also extend this direction to heterogeneous MoE distillation.' },
                { label: 'MOPD:', text: 'I work on MOPD-based capability merging, combining mathematics, coding, and instruction following in small models. I also contribute to larger-scale model merging for industrial coding and multimodal tasks. My focus is on transferring capabilities across tasks, retaining them after merging, and organizing training and evaluation, building experience in model merging across different tasks and scales.' },
                { label: 'Agentic OPD:', text: 'I study distillation for multi-turn agents that reason, use tools, and interact with environment feedback, focusing on training infrastructure and supervision allocation. Turn-level streaming asynchronous training consumes teacher supervision promptly and reduces waiting on long trajectories. An online Critic continually learns from task outcomes to adjust distillation strength across interaction turns, allowing supervision allocation to evolve with the student’s capabilities.' }
            ]],
            ['Efficient Multimodal Generation', [
                'I study how feature dynamics across timesteps, network layers, and frequency bands can reduce redundant computation in image, video, and speech generation. My work spans training-free extrapolation, prediction and calibration, learnable and stage-aware predictors, adaptive verification, and computation allocation, alongside surveys of caching methods and efficient attention. The central questions are which computations can be reused or predicted, when to recompute, and how to preserve quality under acceleration.',
                'This direction also covers how computation is organized throughout generation: progressive resolution, spatiotemporal token selection, noise-trajectory selection, and KV selection and quantization for autoregressive video. In image editing, I explore semantic preservation and local changes; in speech generation, frequency- and wavelet-guided extrapolation. Together, these studies investigate efficiency across features, space, time, and tasks.'
            ]],
            ['Interactive World Models', [
                'I study how video generators can model controllable environments with sustained interaction, responding to natural-language instructions and player actions while preserving scene, state, and history consistency over long horizons. My work spans interactive video data construction, cleaning and annotation, interaction-memory teacher-model SFT, and evaluation of instruction following, action response, and temporal consistency.',
                'For training and inference, I work on Self-Forcing / DMD few-step distillation and reinforcement learning for long-horizon stability and visual quality. This research considers control, interaction memory, and generation efficiency together, aiming to produce coherent interactions under continuous feedback.'
            ]]
        ],
        overviewNote: 'Research on knowledge transfer, generation efficiency, and interactive capabilities.',
        selectedNote: '* Equal contribution; † corresponding author.',
        groups: [
            ['LLM Post-training', ['ESCD']],
            ['Efficient Multimodal Generation', ['FreqCa', 'LESA', 'SpeCa', 'TaylorSeer']],
            ['Interactive World Models', ['GameCraft-2']]
        ],
        otherNote: 'Additional collaborations, surveys, and earlier research, grouped by year.',
        roleFirst: 'First author', roleEqual: 'Co-first author', underReview: 'Under review',
        paper: 'Paper', code: 'Code', project: 'Project', footer: 'Updated October 2026'
    }
};

function overviewParagraph(paragraph) {
    if (typeof paragraph === 'string') return `<p>${escape(paragraph)}</p>`;
    return `<p><strong>${escape(paragraph.label)}</strong> ${escape(paragraph.text)}</p>`;
}

function links(p, l) {
    return (p.links || []).map(item => link(item.type === 'github' ? l.code : item.type === 'project' ? l.project : item.label === 'Paper' ? l.paper : item.label, item.href)).join('');
}

function metadata(p, l, showRole) {
    const role = showRole ? (p.role === 'equal' ? l.roleEqual : p.role === 'first' ? l.roleFirst : '') : '';
    return [p.id === 'ESCD' ? 'ESCD' : '', p.venue.replaceAll('Under Review', l.underReview), role].filter(Boolean).map(escape).join(' · ');
}

function work(p, l, language, compact = false) {
    const primary = (p.links || []).find(item => item.type === 'paper') || (p.links || [])[0];
    const title = primary ? link(p.title, primary.href) : escape(p.title);
    const description = p.description?.[language];
    return `<${compact ? 'li' : 'article'} class="${compact ? '' : 'work'}"${compact ? '' : ` id="work-${escape(p.id)}"`}>
        <${compact ? 'p' : 'h4'} class="work-title">${title}</${compact ? 'p' : 'h4'}>
        <p class="work-meta">${metadata(p, l, compact)}${p.authors ? `<br>${authorText(p.authors)}` : ''}</p>
        ${!compact && description ? `<p class="work-description">${escape(description)}</p>` : ''}
        ${p.links?.length ? `<div class="paper-links">${links(p, l)}</div>` : ''}
    </${compact ? 'li' : 'article'}>`;
}

for (const [language, l] of Object.entries(labels)) {
    const ids = ['about', 'research', 'internships', 'project-overview', 'selected-projects', 'other-publications'];
    const selectedIds = new Set(l.groups.flatMap(group => group[1]));
    const otherPapers = publications.filter(p => !selectedIds.has(p.id));
    const years = [...new Set(otherPapers.map(p => p.year))].sort((a, b) => b - a);
    const html = `<!doctype html>
<html lang="${l.lang}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${l.title}</title>
    <meta name="description" content="${escape(l.description)}">
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" href="static/css/academic.css?v=${stylesheetVersion}">
    <link rel="alternate" hreflang="zh-CN" href="https://tammytcl.github.io/Liu_Homepage/">
    <link rel="alternate" hreflang="en" href="https://tammytcl.github.io/Liu_Homepage/index_en.html">
    <link rel="canonical" href="https://tammytcl.github.io/Liu_Homepage/${language === 'en' ? 'index_en.html' : ''}">
</head>
<body>
<a class="skip-link" href="#about">${language === 'zh' ? '跳到正文' : 'Skip to content'}</a>
<main class="page">
    <div class="topline">
        <nav class="section-nav" aria-label="${language === 'zh' ? '页面导航' : 'Page navigation'}">${l.nav.map((name, i) => link(name, `#${ids[i]}`)).join('')}</nav>
        <nav class="languages" aria-label="Language"><a href="index.html" lang="zh-CN"${language === 'zh' ? ' aria-current="page"' : ''}>中文</a><a href="index_en.html" lang="en"${language === 'en' ? ' aria-current="page"' : ''}>EN</a></nav>
    </div>
    <header id="about">
        <div class="hero">
            <div>
                <h1>Jiacheng Liu <span class="chinese-name">留嘉城</span></h1>
                <p class="affiliation">${l.affiliation}</p>
                <p class="advisor">${l.advisor}: ${link(l.advisorName, 'https://scholar.google.com/citations?user=AK9VF30AAAAJ&hl=zh-CN')}</p>
                <p class="contact-email">Contact: ${link('ljc.mytcl@gmail.com', 'mailto:ljc.mytcl@gmail.com')}</p>
                <div class="contact">${link('Google Scholar', 'https://scholar.google.com/citations?user=B4udiEoAAAAJ')}${link('GitHub', 'https://github.com/Tammytcl')}</div>
            </div>
            <img class="portrait" src="static/img/profile.jpg" width="164" height="164" alt="${language === 'zh' ? '留嘉城的现有头像：阳光下的黑猫' : 'Jiacheng Liu’s existing avatar: a black cat in the sunlight'}">
        </div>
        <p class="bio">${l.bio}</p>
        <p class="opportunities">${l.opportunities}</p>
    </header>
    <section id="research" aria-labelledby="research-heading">
        <h2 id="research-heading">${l.research}</h2>
        <ul class="interests">${l.interests.map(item => `<li>${item}</li>`).join('')}</ul>
    </section>
    <section id="internships" aria-labelledby="internships-heading">
        <h2 id="internships-heading">${l.internships}</h2>
        ${l.experience.map(([company, period, role, description]) => `<article class="experience"><div class="experience-heading"><h3>${company}</h3><span class="period">${period}</span></div><p class="role">${role}</p><p>${description}</p></article>`).join('')}
    </section>
    <section id="project-overview" aria-labelledby="overview-heading">
        <h2 id="overview-heading">${l.overview}</h2>
        <p class="section-note">${l.overviewNote}</p>
        ${l.overviews.map(([heading, paragraphs], i) => `<article class="research-overview" aria-labelledby="overview-${i + 1}"><h3 id="overview-${i + 1}">${escape(heading)}</h3>${paragraphs.map(overviewParagraph).join('')}</article>`).join('\n        ')}
    </section>
    <section id="selected-projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">${l.projects}</h2>
        <p class="section-note">${l.selectedNote}</p>
        ${l.groups.map(([heading, selected], i) => `<div class="selected-group" role="group" aria-labelledby="selected-group-${i + 1}"><h3 class="group-heading" id="selected-group-${i + 1}">${escape(heading)}</h3>${selected.map(id => { const p = publications.find(p => p.id === id); if (!p) throw new Error(`Missing selected paper: ${id}`); return work(p, l, language); }).join('\n')}</div>`).join('\n        ')}
    </section>
    <section id="other-publications" aria-labelledby="publications-heading">
        <h2 id="publications-heading">${l.others}</h2>
        <p class="section-note">${l.otherNote}</p>
        ${years.map(year => `<details class="publication-group"><summary>${year}</summary><ol class="publication-list">${otherPapers.filter(p => p.year === year).map(p => work(p, l, language, true)).join('')}</ol></details>`).join('')}
    </section>
    <footer class="footer"><span>Jiacheng Liu · ${link('ljc.mytcl@gmail.com', 'mailto:ljc.mytcl@gmail.com')}</span><span>${l.footer}</span></footer>
</main>
</body>
</html>
`;
    const filename = language === 'zh' ? 'index.html' : 'index_en.html';
    fs.writeFileSync(path.join(root, filename), html.split('\n').map(line => line.trimEnd()).join('\n'));
    console.log(`Built ${filename}: ${selectedIds.size} selected works, ${otherPapers.length} other papers.`);
}
