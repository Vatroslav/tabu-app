<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { TechOption, CountrySalaryOption, ContractTypeOption, PositionOption } from '@/types/results';
import Multiselect from 'vue-multiselect'

export interface DropdownOption {
    value: string;
    label: string;
}

export default defineComponent({
    name: 'ResultsFilters',
    components: {
        Multiselect
    },
    props: {
        submissionData: {
            type: Object,
            required: true
        },
        additionalPositionData: {
            type: Object,
            required: true
        },
        selectedPosition: {
            type: String,
            required: true
        },
        selectedSeniorities: {
            type: Array,
            required: true
        },
        hasTechOptions: {
            type: Boolean,
            required: true
        },
        techOptions: {
            type: Array as () => TechOption[],
            required: true
        },
        selectedTech: {
            type: Array as () => string[],
            required: true
        },
        countrySalaryOptions: {
            type: Array as () => CountrySalaryOption[],
            required: true
        },
        contracTypeOptions: {
            type: Array as () => ContractTypeOption[],
            required: true
        }
    },
    emits: ['update:selectedPosition', 'update:selectedSeniorities', 'update:selectedTech', 'update:countrySalary', 'update:contractType'],
    setup(props, { emit }) {
        const positionOptions = computed<PositionOption[]>(() => {
            const options: PositionOption[] = [
                {
                    value: 'my_position',
                    label: props.submissionData.position
                },
                {
                    value: 'other_positions_in_department',
                    label: `All positions in ${props.submissionData.position_group}`
                }
            ];

            if (props.additionalPositionData.additional_position) {
                options.push({
                    value: 'additional_position',
                    label: `Additional position: ${props.additionalPositionData.additional_position}`,
                    isAdditional: true
                });
            }

            return options;
        });

        const techDropdownOptions = computed<DropdownOption[]>(() => {
            if (!props.hasTechOptions) {
                return [{ value: 'no_technology', label: 'No technology' }];
            }

            return props.techOptions.map(tech => ({
                value: tech.tech,
                label: tech.tech
            }));
        });

        const countryDropdownOptions = computed<DropdownOption[]>(() => {
            return props.countrySalaryOptions.map(country => ({
                value: country.country_salary,
                label: country.country_salary
            }));
        });

        const contractDropdownOptions = computed<DropdownOption[]>(() => {
            return props.contracTypeOptions.map(contract => ({
                value: contract.contract_type,
                label: contract.contract_type
            }));
        });

        const toggleSeniority = (seniority: string) => {
            const index = props.selectedSeniorities.indexOf(seniority);
            if (index === -1) {
                emit('update:selectedSeniorities', [...props.selectedSeniorities, seniority]);
            } else {
                const newSeniorities = [...props.selectedSeniorities];
                newSeniorities.splice(index, 1);
                emit('update:selectedSeniorities', newSeniorities);
            }
        };

        const handleTechUpdate = (value: any) => {
            emit('update:selectedTech', value);
        };

        return {
            toggleSeniority,
            positionOptions,
            techDropdownOptions,
            countryDropdownOptions,
            contractDropdownOptions,
            handleTechUpdate
        }
    }
})
</script>

<template>
    <div class="filters">
        <p class="filters-title">Customize the report by selecting filters:</p>

        <div class="filter-row">
            <label for="position" class="filter-label">Position:</label>
            <select id="position" class="input-field" :value="selectedPosition" @change="$emit('update:selectedPosition', ($event.target as HTMLSelectElement).value)">
                <option v-for="option in positionOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>

        <div class="filter-row seniority-row">
            <label class="filter-label">Seniority:</label>
            <div class="seniority-group">
                <button class="seniority-btn" :class="{ active: selectedSeniorities.includes('Junior') }"
                    :disabled="submissionData.seniority === 'N/A'" @click="toggleSeniority('Junior')">
                    Junior
                </button>

                <button class="seniority-btn" :class="{ active: selectedSeniorities.includes('Middle') }"
                    :disabled="submissionData.seniority === 'N/A'" @click="toggleSeniority('Middle')">
                    Middle
                </button>

                <button class="seniority-btn" :class="{ active: selectedSeniorities.includes('Senior') }"
                    :disabled="submissionData.seniority === 'N/A'" @click="toggleSeniority('Senior')">
                    Senior
                </button>
            </div>
        </div>

        <div class="filter-row">
            <label for="technology" class="filter-label">Technology:</label>
            <Multiselect
                :model-value="selectedTech"
                :options="techDropdownOptions"
                :multiple="true"
                :disabled="!hasTechOptions"
                :class="{ disabled: !hasTechOptions }"
                :placeholder="hasTechOptions ? 'Select technologies' : 'No technology'"
                @update:modelValue="handleTechUpdate"
                track-by="value"
                label="label"
            >
                <template #noResult>
                    No such technology for the selected position(s).
                </template>
            </Multiselect>
        </div>

        <div class="filter-row">
            <label for="country" class="filter-label">Country:</label>
            <select id="country" class="input-field" :value="submissionData.country_salary"
                @change="$emit('update:countrySalary', ($event.target as HTMLSelectElement).value)">
                <option v-for="option in countryDropdownOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>

        <div class="filter-row">
            <label for="contract" class="filter-label">Contract:</label>
            <select id="contract" class="input-field" :value="submissionData.contract_type"
                @change="$emit('update:contractType', ($event.target as HTMLSelectElement).value)">
                <option v-for="option in contractDropdownOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
    </div>
</template>

<style scoped>
.filters {
    order: 1;
    margin-right: 120px;
}

.filter-row {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-weight: 500;
}

.filter-row label {
    padding: 8px;
    margin-top: 0px;
}

.filter-row .input-field {
    flex: 1;
    width: 100%;
    padding: 8px;
    border: none;
    background-color: white;
}

.filters-title {
    font-weight: 700;
    color: #333;
    margin-bottom: 20px;
}

.filter-label {
    display: block;
    margin-top: 10px;
    color: #6D6D6D;
}

.input-field.disabled {
    background-color: #f5F7EE;
    color: #969694;
    box-shadow: inset 0 0 0 1px #969694;
    border-radius: 3px;
    cursor: not-allowed;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

.seniority-row {
    align-items: flex-start;
}

.seniority-group {
    flex: 1;
    display: flex;
    justify-content: space-between;
}

.seniority-btn {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 3px;
    background-color: white;
    cursor: pointer;
}

.seniority-btn:nth-child(2) {
    margin: 0 10px;
}

.seniority-btn.active {
    color: black;
    border: none;
    box-shadow: inset 0 0 0 2px black;
}

.seniority-btn:disabled {
    background-color: #f5F7EE;
    cursor: not-allowed;
    color: #969694;
    box-shadow: inset 0 0 0 1px #969694;
    border-radius: 3px;
}

@media (min-width: 768px) {
    .filters {
        min-width: 500px;
        max-width: 600px;
    }

    .filters-title {
        font-size: 18px;
    }

    .filter-label {
        font-size: 18px;
    }

    .filter-row label {
        width: 120px;
    }

    .filter-row .input-field {
        font-size: 18px;
    }

    .seniority-btn {
        font-size: 18px;
    }
}

@media (max-width: 768px) {
    .filters {
        min-width: 300px;
        max-width: 400px;
    }

    .filters-title {
        font-size: 12px;
    }

    .filter-label {
        font-size: 12px;
    }

    .filter-row label {
        width: 80px;
    }

    .filter-row .input-field {
        font-size: 12px;
    }

    .seniority-btn {
        font-size: 12px;
    }

    :deep(.multiselect) {
        font-size: 12px;
    }

    :deep(.multiselect__tags) {
        padding: 4px;
        min-height: 24px;
    }

    :deep(.multiselect__tag) {
        padding: 2px 6px;
        font-size: 12px;
    }
    
    :deep(.multiselect__tag-icon) {
        width: 16px;
        height: 16px;
    }
    
    :deep(.multiselect__tag-icon:after) {
        font-size: 12px;
    }

    :deep(.multiselect__option) {
        font-size: 12px !important;
        padding: 6px;
        white-space: normal;
        word-wrap: break-word;
    }

    :deep(.multiselect__placeholder) {
        font-size: 12px;
    }

    :deep(.multiselect__input) {
        font-size: 12px;
    }

    :deep(.multiselect__input::placeholder) {
        font-size: 12px;
    }

    :deep(.multiselect__content-wrapper) {
        font-size: 12px;
        width: 100%;
    }

    :deep(.multiselect__content) {
        font-size: 12px;
        width: 100%;
    }

    :deep(.multiselect__element) {
        font-size: 12px;
        width: 100%;
    }
}

:deep(.multiselect) {
    flex: 1;
    width: 100%;
    min-height: unset;
    font-weight: 400;
    font-family: Matter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

:deep(.multiselect:focus) {
    outline: none;
    box-shadow: none;
}

:deep(.multiselect__tags:focus) {
    outline: none;
    box-shadow: none;
}

:deep(.multiselect__input:focus) {
    outline: none;
    box-shadow: none;
}

:deep(.multiselect__content-wrapper) {
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: auto;
    width: 100%;
}

:deep(.multiselect__content-wrapper:focus) {
    outline: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.multiselect__tags) {
    border: none;
    background-color: white;
    padding: 8px;
    min-height: unset;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-weight: 400;
    font-family: Matter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

:deep(.multiselect__input) {
    padding: 0;
    margin: 0;
    min-height: unset;
    width: 100%;
    flex: 1;
    border: none;
    background: transparent;
    font-size: inherit;
    font-weight: 400;
    font-family: Matter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

:deep(.multiselect__input::placeholder) {
    color: #6D6D6D;
    font-weight: 400;
    font-family: Matter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

:deep(.multiselect__placeholder) {
    color: #6D6D6D;
    padding: 0;
    margin: 0;
    font-size: inherit;
    font-weight: 400;
    font-family: Matter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

:deep(.multiselect__content) {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

:deep(.multiselect__element) {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

:deep(.multiselect__option) {
    padding: 8px;
    font-size: 16px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    cursor: pointer;
    transition: background-color 0.2s;
    list-style: none;
    font-weight: 400;
    font-family: Matter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

:deep(.multiselect__option--highlight) {
    background: #D9FF80;
    color: #333;
}

:deep(.multiselect__option--selected) {
    background: #f0f0f0;
    color: #333;
    font-weight: 500;
}

:deep(.multiselect__option--selected.multiselect__option--highlight) {
    background: #FF9883;
    color: #333;
}

:deep(.multiselect__option--group) {
    padding: 8px;
    font-weight: 600;
    background: #f8f8f8;
    list-style: none;
}

:deep(.multiselect__option--group.multiselect__option--highlight) {
    background: #f8f8f8;
    color: #333;
}

:deep(.multiselect__option--group-selected.multiselect__option--highlight) {
    background: #f8f8f8;
    color: #333;
}

:deep(.multiselect__tags-wrap) {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 4px;
}

:deep(.multiselect__tag) {
    background: #D9FF80;
    color: #333;
    padding: 4px 8px;
    margin: 0;
    border-radius: 3px;
    display: flex;
    align-items: center;
    max-width: calc(100% - 4px);
    font-weight: 400;
    font-family: Matter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

:deep(.multiselect__tag-icon) {
    background: #c2e666;
    border-radius: 3px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

:deep(.multiselect__tag-icon:after) {
    color: #333;
    font-size: 14px;
    line-height: 1;
    content: "×";
}

:deep(.multiselect__tag-icon:focus),
:deep(.multiselect__tag-icon:hover) {
    background: #b3d95c;
}

:deep(.multiselect__tag-icon:active) {
    background: #a6cc52;
}

:deep(.multiselect__spinner) {
    background: white;
    height: 24px;
    line-height: 24px;
}

:deep(.multiselect.disabled) {
    background-color: #f5F7EE;
    color: #969694;
    box-shadow: inset 0 0 0 1px #969694;
    border-radius: 3px;
    cursor: not-allowed;
}

:deep(.multiselect.disabled .multiselect__tags) {
    background-color: #f5F7EE;
    box-shadow: inset 0 0 0 1px #969694;
    border-radius: 3px;
}

:deep(.multiselect.disabled .multiselect__placeholder) {
    color: #969694;
}

:deep(.multiselect.disabled .multiselect__input) {
    color: #969694;
}
</style> 