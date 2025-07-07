// Job type definitions for JSDoc comments

/**
 * @typedef {Object} Job
 * @property {number} id
 * @property {string} title
 * @property {string} company
 * @property {string} location
 * @property {string} posting_date
 * @property {'Full-time'|'Part-time'|'Contract'|'Remote'} job_type
 * @property {string[]} tags
 * @property {string} [description]
 * @property {string} [salary]
 */

/**
 * @typedef {Object} JobFilters
 * @property {string} [job_type]
 * @property {string} [location]
 * @property {string} [keyword]
 * @property {'posting_date_desc'|'posting_date_asc'|'title_asc'|'title_desc'} [sort]
 */

export {};