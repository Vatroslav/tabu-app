// the axios instance and types
import http from './api'

async function dataAmountFilterCheck(
    position_group: string | null,
    position: string | null,
    seniority: string | null,
    country_salary: string | null,
    contract_type: string | null,
    tech: string | null
) {
    return await http({
        url: 'api/data_amount/filter',
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        data: {
            parameter_position_group: position_group,
            parameter_position: position,
            parameter_seniority: seniority,
            parameter_country_salary: country_salary,
            parameter_contract_type: contract_type,
            parameter_tech: tech
        },
    })
}

export { dataAmountFilterCheck }
