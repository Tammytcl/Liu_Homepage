import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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
                '我关注如何将强教师模型的能力有效迁移到学生模型，并让模型在与环境交互的过程中持续学习。研究从 On-Policy Distillation 出发，覆盖跨 Tokenizer 监督对齐、异构 MoE 知识迁移与 MOPD，重点讨论模型词表和结构不一致时如何构造有效监督，以及训练效率与能力保持之间的关系。',
                '进一步将知识迁移拓展到多轮 Coding Agent：模型需要在推理、工具调用和环境反馈之间反复切换，监督也需要覆盖完整交互过程。围绕 Terminal-Bench 2.0 与 SWE-bench Verified，研究轨迹采样、监督分配、训练与评测的一致性及任务求解能力；同时参与开放式可验证任务构建与科研任务评测相关工作，关注更复杂任务中的能力学习与检验。'
            ]],
            ['高效多模态生成', [
                '围绕图像、视频与语音生成中的重复计算，我研究如何利用特征随时间步、网络层级和频段变化的规律，减少昂贵的模型计算。相关工作覆盖免训练特征外推、预测与校准、可学习及阶段感知预测、自适应验证和计算分配，并从理论与综述角度梳理缓存方法及高效注意力机制。核心问题是：哪些计算可以复用或预测，何时需要重新计算，以及如何在加速时保留生成质量。',
                '这一研究主线也延伸到生成过程本身的计算组织，包括渐进分辨率、时空 Token 选择、噪声轨迹选择，以及自回归视频中的 KV 选择与量化；在图像编辑中关注语义保持与局部修改，在语音生成中探索频域与小波引导的外推。通过结合特征、空间、时间和任务层面的计算策略，探索适用于多种生成与编辑任务的效率方法。'
            ]],
            ['交互式世界模型', [
                '我关注生成模型如何从单向的视频合成走向可控制、可持续交互的环境建模：既响应自然语言指令和玩家动作，也在长时序生成中维持场景、状态与历史的一致性。相关工作贯穿交互视频数据构建、清洗与标注，交互记忆教师模型 SFT，以及指令跟随、动作响应和时序一致性的评测。',
                '在训练与推理方面，基于 Self-Forcing 与 DMD 开展少步蒸馏，并结合强化学习优化长程生成稳定性与视觉质量。研究重点是将控制能力、交互记忆与生成效率一起考虑，使世界模型能够在持续反馈中生成连贯的交互过程。'
            ]],
            ['早期研究：医学视觉与生成', [
                '早期工作围绕医学图像分割与合成，探索卷积、Transformer 与 Mamba 对局部细节和全局结构的建模，以及特征量化与扩散生成的结合。这些研究构成了我对视觉表征、结构建模和生成方法的基础，并逐步延伸到当前对多模态模型效率与能力的研究。'
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
                'I study how to transfer capabilities from strong teachers to student models and enable learning through interaction with an environment. My work on on-policy distillation spans cross-tokenizer supervision alignment, heterogeneous MoE knowledge transfer, and MOPD. I focus on constructing useful supervision across different vocabularies and model architectures, and on balancing training efficiency with capability retention.',
                'I extend this direction to multi-turn coding agents, where reasoning, tool use, and environment feedback form an ongoing interaction. Using Terminal-Bench 2.0 and SWE-bench Verified, I investigate trajectory sampling, supervision allocation, consistency between training and evaluation, and task-solving capabilities. I also contribute to work on open-ended verifiable tasks and research-task evaluation, exploring how capabilities can be learned and assessed on more complex problems.'
            ]],
            ['Efficient Multimodal Generation', [
                'I study how feature dynamics across timesteps, network layers, and frequency bands can reduce redundant computation in image, video, and speech generation. My work spans training-free extrapolation, prediction and calibration, learnable and stage-aware predictors, adaptive verification, and computation allocation, alongside surveys of caching methods and efficient attention. The central questions are which computations can be reused or predicted, when to recompute, and how to preserve quality under acceleration.',
                'This direction also covers how computation is organized throughout generation: progressive resolution, spatiotemporal token selection, noise-trajectory selection, and KV selection and quantization for autoregressive video. In image editing, I explore semantic preservation and local changes; in speech generation, frequency- and wavelet-guided extrapolation. Together, these studies investigate efficiency across features, space, time, and tasks.'
            ]],
            ['Interactive World Models', [
                'I study how video generators can model controllable environments with sustained interaction, responding to natural-language instructions and player actions while preserving scene, state, and history consistency over long horizons. My work spans interactive video data construction, cleaning and annotation, interaction-memory teacher-model SFT, and evaluation of instruction following, action response, and temporal consistency.',
                'For training and inference, I work on Self-Forcing / DMD few-step distillation and reinforcement learning for long-horizon stability and visual quality. This research considers control, interaction memory, and generation efficiency together, aiming to produce coherent interactions under continuous feedback.'
            ]],
            ['Earlier Work: Medical Vision and Generation', [
                'My earlier work on medical image segmentation and synthesis explores local detail and global structure with convolutional, Transformer, and Mamba architectures, as well as feature quantization for diffusion-based synthesis. These studies form the foundation of my interest in visual representations, structural modeling, and generative methods, leading to my current research on multimodal model efficiency and capabilities.'
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
    <link rel="stylesheet" href="static/css/academic.css">
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
        ${l.overviews.map(([heading, paragraphs], i) => `<article class="research-overview" aria-labelledby="overview-${i + 1}"><h3 id="overview-${i + 1}">${escape(heading)}</h3>${paragraphs.map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}</article>`).join('\n        ')}
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
