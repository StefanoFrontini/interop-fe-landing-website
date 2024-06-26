import { getLocalizedValue } from '@/utils/common.utils'
import { Button, Chip, Stack } from '@mui/material'
import React from 'react'

type ActiveFiltersChipsProps = {
  eserviceActiveFilter: string
  providerActiveFilters: Array<string>
  onRemoveActiveNameFilter: VoidFunction
  onRemoveActiveProducerNameFilter: (filter: string) => void
  onResetActiveFilters: VoidFunction
  rightContent?: React.ReactNode
}

export const ActiveFiltersChips: React.FC<ActiveFiltersChipsProps> = ({
  eserviceActiveFilter,
  providerActiveFilters,
  onRemoveActiveNameFilter,
  onRemoveActiveProducerNameFilter,
  onResetActiveFilters,
  rightContent,
}) => {
  if (eserviceActiveFilter.length <= 0 && providerActiveFilters.length <= 0 && !rightContent) {
    return null
  }

  const cancelFiltersLabel = getLocalizedValue({
    it: 'Annulla filtri',
    en: 'Cancel filters',
  })

  const isButtonResetFiltersShown =
    providerActiveFilters.length > 1 ||
    (providerActiveFilters.length > 0 && eserviceActiveFilter !== '')

  return (
    <Stack
      spacing={rightContent ? 2 : 0}
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        flexWrap="wrap"
        gap={1}
        alignItems={{ xs: 'start', md: 'center' }}
        sx={{ width: '100%', mb: { xs: 4, md: 0 } }}
      >
        {eserviceActiveFilter !== '' && (
          <Chip
            key={`eservice${eserviceActiveFilter}`}
            label={`${getLocalizedValue({
              it: 'e-service',
              en: 'e-service',
            })}: ${eserviceActiveFilter}`}
            onDelete={onRemoveActiveNameFilter}
          />
        )}
        {providerActiveFilters.map((filter, index) => (
          <Chip
            key={`provider${filter}${index}`}
            label={`${getLocalizedValue({ it: 'erogatore', en: 'producer' })}: ${filter}`}
            onDelete={onRemoveActiveProducerNameFilter.bind(null, filter as string)}
          />
        ))}
        {isButtonResetFiltersShown && (
          <Stack direction="column" justifyContent="center">
            <Button
              sx={{ mt: { xs: 1, md: 0 } }}
              type="button"
              variant="naked"
              onClick={onResetActiveFilters}
            >
              {cancelFiltersLabel}
            </Button>
          </Stack>
        )}
      </Stack>
      {rightContent}
    </Stack>
  )
}
