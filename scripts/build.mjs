import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stylesheetVersion = createHash('sha256').update(fs.readFileSync(path.join(root, 'static/css/academic.css'))).digest('hex').slice(0, 12);
const portraitVersion = createHash('sha256').update(fs.readFileSync(path.join(root, 'static/img/profile.png'))).digest('hex').slice(0, 12);
const resumeVersion = createHash('sha256').update(fs.readFileSync(path.join(root, 'assets/resume.pdf'))).digest('hex').slice(0, 12);
const publications = JSON.parse(fs.readFileSync(path.join(root, 'data/publications.json'), 'utf8'));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const authorText = value => escape(value).replaceAll('Jiacheng Liu', '<strong>Jiacheng Liu</strong>');
const link = (label, href) => `<a href="${escape(href)}">${escape(label)}</a>`;
const labels = {
    zh: {
        lang: 'zh-CN', title: '留嘉城 · Jiacheng Liu', description: '留嘉城，上海交通大学人工智能学院博士生。研究大语言模型后训练与智能体、高效多模态生成及交互式世界模型。',
        nav: ['简介', '研究方向', '实习', '项目介绍', '代表项目', '论文汇总'],
        affiliation: '上海交通大学 · 人工智能学院 · 博士生',
        advisor: '指导教师', advisorName: '张林峰教授',
        resume: '查看简历', resumeLabel: '在新标签页查看简历 PDF',
        bio: '我是<a href="https://www.sjtu.edu.cn/">上海交通大学</a>人工智能学院 2026 级博士生。我的研究围绕生成模型与智能体的效率和能力展开，重点关注多轮 Coding Agent 及其后训练方法、高效多模态生成，以及交互式世界模型。',
        opportunities: '欢迎 LLM 后训练、智能体、多模态生成与世界模型方向的研究实习和合作交流。',
        research: '研究方向', internships: '实习经历', overview: '项目介绍', projects: '代表项目', others: '论文汇总',
        interests: [
            '<strong>大语言模型后训练与智能体：</strong>Coding Agent 任务构建、长程交互中的信用分配、Multi-turn agent 异步训练，以及 On-Policy Distillation 与跨模型知识迁移。',
            '<strong>高效多模态生成：</strong>特征预测与缓存、自适应计算、视频 KV 缓存与量化、少步蒸馏。',
            '<strong>交互式世界模型：</strong>指令驱动的视频生成、动作响应与长时序一致性。'
        ],
        experience: [
            ['无尽前沿（Endless Frontier）', '2026.09–至今', 'LLM 基模组 · 后训练实习生 · 上海', '围绕多轮 Coding Agent 开展训练研究，关注工具调用、环境反馈与交互轨迹上的蒸馏学习；同时开展跨 Tokenizer、异构 MoE 知识迁移及多能力合并训练。'],
            ['腾讯混元', '2025.07–2026.06', '世界模型组 · 青云计划研究实习生', '参与 Hunyuan-GameCraft-2 的交互视频数据、教师模型 SFT、Self-Forcing / DMD 少步蒸馏、强化学习优化与评测。']
        ],
        overviews: [
            ['大语言模型后训练与智能体', [
                { label: "1. Coding Agent：任务生成与分布式验证", text: "构建从仓库与 PR/Issue 采集、候选筛选、版本定位到容器化任务生成与验证的数据流水线，产出包含题面、修复前代码、参考补丁及测试的可执行任务。基于 Temporal 编排多 Worker 并行执行，支持全局资源配额、失败重试和已提交结果复用；通过隔离测试与修复前后对照，校验任务可解性和判分有效性。" },
                { label: "2. 长程 Agent：三角色异步训练与信用分配", text: "面向 27B→9B Agent Coding 任务，实现 Rollout、Teacher、Actor 三角色轮级异步流水线。通过教师前缀缓存、轨迹内上下文合并和完整轨迹提前反向衔接评分与训练，在有效 Token 窗口内累积梯度、统一更新并发布权重。冻结教师骨干，以学生完整轨迹的终局成败离线训练前缀价值头，评分时共享教师前向；根据相邻 Token 前缀的价值差构造非负权重，对 Actor 的 OPD 损失进行加权。" },
                { label: "3. 能力迁移：跨 Tokenizer 蒸馏与多教师融合", text: "在共享字节空间中对齐师生预测，将教师概率映射为学生词表上的监督目标；针对教师事件跨越多个学生 Token 的情况，聚合合法补全 Token 的概率，监督后续生成。在 Kimi 1T→Qwen 35B、Qwen 397B→30B 的跨 Tokenizer MoE 蒸馏中验证；其中 Kimi 配置在物理推理基准 PHYRD-40 上的平均分较最强对比基线提升 5.1 分。同时通过 MOPD 融合数学、代码与指令遵循能力，并参与工业代码及多模态任务的 27B 级模型合版。" }
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
        overviewNote: '以下介绍我正在开展及此前参与的研究工作。',
        representativeWorks: '以上代表工作：',
        selectedNote: '* 表示同等贡献，† 表示通讯作者。',
        groups: [
            ['大语言模型后训练', ['ESCD', 'TRAIL', 'PHYRD', 'BigBang']],
            ['高效多模态生成', ['FreqCa', 'LESA', 'SpeCa', 'TaylorSeer']],
            ['交互式世界模型', ['GameCraft-2']]
        ],
        otherNote: '收录论文、综述、技术报告及进行中的研究。在审稿件按投稿年份整理。',
        roleFirst: '一作', roleEqual: '共同一作', underReview: '在审', inProgress: '进行中',
        paper: '论文', code: '代码', project: '项目', report: '最新报告', resource: '资源', evaluation: '评测代码', footer: '更新于 2026 年 10 月'
    },
    en: {
        lang: 'en', title: 'Jiacheng Liu (留嘉城)', description: 'Jiacheng Liu, Ph.D. student at Shanghai Jiao Tong University. LLM post-training and agents, efficient multimodal generation, and interactive world models.',
        nav: ['About', 'Research', 'Internships', 'Project Overview', 'Selected Work', 'Publications'],
        affiliation: 'Ph.D. Student · School of Artificial Intelligence · SJTU',
        advisor: 'Advisor', advisorName: 'Prof. Linfeng Zhang',
        resume: 'View CV', resumeLabel: 'View CV PDF in a new tab',
        bio: 'I am a first-year Ph.D. student (2026 cohort) at the School of Artificial Intelligence, <a href="https://en.sjtu.edu.cn/">Shanghai Jiao Tong University</a>. My research focuses on the efficiency and capabilities of generative models and agents, spanning multi-turn coding agents and their post-training methods, efficient multimodal generation, and interactive world models.',
        opportunities: 'I welcome research internship and collaboration opportunities in LLM post-training, agents, multimodal generation, and world models.',
        research: 'Research Interests', internships: 'Internships', overview: 'Project Overview', projects: 'Selected Projects', others: 'Publications',
        interests: [
            '<strong>LLM post-training and agents:</strong> Coding Agent task construction, credit assignment in long-horizon interactions, asynchronous training for multi-turn agents, and on-policy distillation and cross-model knowledge transfer.',
            '<strong>Efficient multimodal generation:</strong> feature prediction and caching, adaptive computation, video KV caching and quantization, and few-step distillation.',
            '<strong>Interactive world models:</strong> instruction-driven video generation, action response, and long-horizon consistency.'
        ],
        experience: [
            ['Endless Frontier', 'Sep 2026–Present', 'LLM Foundation Model Team · Post-training Intern · Shanghai', 'Research on training multi-turn coding agents, focusing on tool use, environment feedback, and distillation along interaction trajectories, alongside cross-tokenizer and heterogeneous MoE knowledge transfer and capability merging.'],
            ['Tencent Hunyuan', 'Jul 2025–Jun 2026', 'World Model Team · Qingyun Research Intern', 'Contributed to Hunyuan-GameCraft-2 through interactive video data, teacher-model SFT, Self-Forcing / DMD few-step distillation, reinforcement learning, and evaluation.']
        ],
        overviews: [
            ['LLM Post-training and Agents', [
                { label: "1. Coding Agent: Task Generation and Distributed Validation", text: "I implement a pipeline for repository and PR/issue collection, candidate filtering, version resolution, and containerized task generation and validation. Each executable task includes a problem statement, pre-fix code, a reference patch, and tests. Temporal orchestrates parallel execution across workers, with global resource quotas, failure retries, and reuse of committed results. Isolated tests and comparisons before and after applying the fix check task solvability and scoring validity." },
                { label: "2. Long-horizon Agents: Three-role Asynchronous Training and Credit Assignment", text: "For 27B-to-9B agent coding tasks, I implement a turn-streamed asynchronous Rollout–Teacher–Actor pipeline. Teacher prefix caching, within-trajectory context coalescing, and early backward on completed trajectories connect scoring and training. Gradients accumulate within active-token windows before student updates and weight publication. With the teacher backbone frozen, I train a prefix-value head offline on terminal outcomes from complete student trajectories. Scoring shares the teacher forward pass, and differences between adjacent token-prefix values produce nonnegative weights for the Actor's OPD loss." },
                { label: "3. Knowledge Transfer: Cross-tokenizer Distillation and Multi-teacher Fusion", text: "I align teacher and student predictions in a shared byte space and map teacher probabilities to targets over the student vocabulary. When a teacher event spans multiple student tokens, I supervise continuation by aggregating probabilities over valid completion tokens. I evaluate cross-tokenizer MoE distillation from Kimi 1T to Qwen 35B and from Qwen 397B to 30B. In the Kimi setting, the student improves the PHYRD-40 physics-reasoning mean score by 5.1 points over the strongest evaluated baseline. I also use MOPD to combine mathematics, coding, and instruction-following capabilities, and contribute to 27B-model capability merging for industrial coding and multimodal tasks." }
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
        overviewNote: 'Below are research projects I am currently working on or have contributed to in the past.',
        representativeWorks: 'Representative work above:',
        selectedNote: '* Equal contribution; † corresponding author.',
        groups: [
            ['LLM Post-training', ['ESCD', 'TRAIL', 'PHYRD', 'BigBang']],
            ['Efficient Multimodal Generation', ['FreqCa', 'LESA', 'SpeCa', 'TaylorSeer']],
            ['Interactive World Models', ['GameCraft-2']]
        ],
        otherNote: 'Papers, surveys, technical reports, and research in progress. Submissions under review are grouped by submission year.',
        roleFirst: 'First author', roleEqual: 'Co-first author', underReview: 'Under review', inProgress: 'In progress',
        paper: 'Paper', code: 'Code', project: 'Project', report: 'Latest Report', resource: 'Resources', evaluation: 'Evaluation Code', footer: 'Updated October 2026'
    }
};

function overviewParagraph(paragraph) {
    if (typeof paragraph === 'string') return `<p>${escape(paragraph)}</p>`;
    return `<p><strong>${escape(paragraph.label)}</strong><br>${escape(paragraph.text)}</p>`;
}

function representativeWorks(ids, l) {
    const references = ids.map(id => {
        const paper = publications.find(p => p.id === id);
        if (!paper) throw new Error(`Missing representative work: ${id}`);
        const name = id === 'GameCraft-2' ? 'Hunyuan-GameCraft-2' : id;
        const annotation = id === 'ESCD' || id === 'PHYRD'
            ? (l.lang === 'zh-CN' ? 'ICLR 在投' : 'ICLR, under review')
            : id === 'BigBang'
                ? (l.lang === 'zh-CN' ? '技术报告' : 'Technical Report')
                : id === 'GameCraft-2'
                    ? (l.lang === 'zh-CN' ? '技术报告、CVPR 2026 Workshop' : 'Technical Report, CVPR 2026 Workshop')
                    : ['TaylorSeer', 'SpeCa', 'LESA', 'FreqCa'].includes(id) ? paper.venue : '';
        const suffix = annotation ? (l.lang === 'zh-CN' ? `（${annotation}）` : ` (${annotation})`) : '';
        return link(name, `#work-${id}`) + escape(suffix);
    });
    return `<p class="representative-works"><strong>${escape(l.representativeWorks)}</strong> ${references.join(l.lang === 'zh-CN' ? '；' : '; ')}</p>`;
}

function sectionHeading(id, title, number) {
    return `<h2 class="section-heading" id="${escape(id)}"><span class="section-index" aria-hidden="true">${String(number).padStart(2, '0')}</span><span>${escape(title)}</span></h2>`;
}

function links(p, l) {
    return (p.links || []).map(item => link(item.type === 'github' ? l.code : item.type === 'project' ? l.project : item.type === 'report' ? l.report : item.type === 'resource' ? l.resource : item.type === 'evaluation' ? l.evaluation : item.label === 'Paper' ? l.paper : item.label, item.href)).join('');
}

function metadata(p, l, showRole) {
    const role = showRole ? (p.role === 'equal' ? l.roleEqual : p.role === 'first' ? l.roleFirst : '') : '';
    return [p.venue.replaceAll('Under Review', l.underReview).replaceAll('In progress', l.inProgress), role].filter(Boolean).map(escape).join(' · ');
}

const archiveYear = p => p.submissionYear ?? p.year;

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
    const years = [...new Set(publications.map(archiveYear))].sort((a, b) => b - a);
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
                <div class="contact">${link('Google Scholar', 'https://scholar.google.com/citations?user=B4udiEoAAAAJ')}${link('GitHub', 'https://github.com/Tammytcl')}<a class="resume-link" href="assets/resume.pdf?v=${resumeVersion}" target="_blank" rel="noopener noreferrer" aria-label="${escape(l.resumeLabel)}">${escape(l.resume)} <span aria-hidden="true">↗</span></a></div>
            </div>
            <img class="portrait" src="static/img/profile.png?v=${portraitVersion}" width="164" height="164" alt="${language === 'zh' ? '留嘉城的个人头像' : 'Portrait of Jiacheng Liu'}">
        </div>
        <p class="bio">${l.bio}</p>
        <p class="opportunities">${l.opportunities}</p>
    </header>
    <section id="research" aria-labelledby="research-heading">
        ${sectionHeading('research-heading', l.research, 1)}
        <ul class="interests">${l.interests.map(item => `<li>${item}</li>`).join('')}</ul>
    </section>
    <section id="internships" aria-labelledby="internships-heading">
        ${sectionHeading('internships-heading', l.internships, 2)}
        ${l.experience.map(([company, period, role, description]) => `<article class="experience"><div class="experience-heading"><h3>${company}</h3><span class="period">${period}</span></div><p class="role">${role}</p><p>${description}</p></article>`).join('')}
    </section>
    <section id="project-overview" aria-labelledby="overview-heading">
        ${sectionHeading('overview-heading', l.overview, 3)}
        <p class="section-note">${l.overviewNote}</p>
        ${l.overviews.map(([heading, paragraphs], i) => `<article class="research-overview" aria-labelledby="overview-${i + 1}"><h3 id="overview-${i + 1}">${escape(heading)}</h3>${paragraphs.map(overviewParagraph).join('')}${representativeWorks(l.groups[i][1], l)}</article>`).join('\n        ')}
    </section>
    <section id="selected-projects" aria-labelledby="projects-heading">
        ${sectionHeading('projects-heading', l.projects, 4)}
        <p class="section-note">${l.selectedNote}</p>
        ${l.groups.map(([heading, selected], i) => `<div class="selected-group" role="group" aria-labelledby="selected-group-${i + 1}"><h3 class="group-heading" id="selected-group-${i + 1}">${escape(heading)}</h3>${selected.map(id => { const p = publications.find(p => p.id === id); if (!p) throw new Error(`Missing selected paper: ${id}`); return work(p, l, language); }).join('\n')}</div>`).join('\n        ')}
    </section>
    <section id="other-publications" aria-labelledby="publications-heading">
        ${sectionHeading('publications-heading', l.others, 5)}
        <p class="section-note">${l.otherNote}</p>
        ${years.map(year => `<details class="publication-group"><summary>${year}</summary><ol class="publication-list">${publications.filter(p => archiveYear(p) === year).map(p => work(p, l, language, true)).join('')}</ol></details>`).join('')}
    </section>
    <footer class="footer"><span>Jiacheng Liu · ${link('ljc.mytcl@gmail.com', 'mailto:ljc.mytcl@gmail.com')}</span><span>${l.footer}</span></footer>
</main>
</body>
</html>
`;
    const filename = language === 'zh' ? 'index.html' : 'index_en.html';
    fs.writeFileSync(path.join(root, filename), html.split('\n').map(line => line.trimEnd()).join('\n'));
    console.log(`Built ${filename}: ${selectedIds.size} selected works, ${publications.length} publication entries in the complete list.`);
}
