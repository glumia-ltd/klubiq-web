# Klubiq UI Components Documentation

This document provides an overview and usage guide for all components in the `@/components` (Klubiq UI Components) library.

---

## Table of Contents

- [AlertBanner](#alertbanner)
- [DataPagination](#datapagination)
- [ErrorComponent](#errorcomponent)
- [FeedbackContent](#feedbackcontent)
- [Filter](#filter)
- [GroupedAvatar](#groupedavatar)
- [LoaderComponent](#loadercomponent)
- [PageHeader](#pageheader)
- [PasswordStrengthBar](#passwordstrengthbar)
- [TabsComponent](#tabscomponent)
- [ViewPort](#viewport)
- [Table](#table)
- [ActivityCard](#activitycard)
- [AmenityCard](#amenitycard)
- [PageDetail](#pagedetail)
- [DocumentList](#documentlist)
- [InfoCard](#infocard)
- [SavedPaymentCard](#savedpaymentcard)
- [DynamicAvatar](#dynamicavatar)
- [DynamicBreadcrumb](#dynamicbreadcrumb)
- [ErrorBoundary](#errorboundary)
- [DynamicModal](#dynamicmodal)

---

## AlertBanner

**Description:**
Displays a dismissible alert message in a snackbar. Useful for notifications and feedback.

**Props:**
| Name | Type | Default | Description |
|-----------------|---------------------|---------|-----------------------------------|
| message | string | — | The message to display. |
| open | boolean | true | Controls visibility. |
| autoHideDuration| number | 6000 | Duration before auto-hide (ms). |
| onClose | () => void | — | Callback when closed. |
| ...AlertProps | MUI AlertProps | — | Additional MUI Alert props. |

**Example:**

```tsx
<AlertBanner
	message='Profile updated!'
	severity='success'
	onClose={() => setShow(false)}
/>
```

---

## DataPagination

**Description:**
Pagination control with item count display. Useful for paginated tables or lists.

**Props:**
| Name | Type | Default | Description |
|--------------|----------|---------|---------------------------------------------|
| totalItems | number | — | Total number of items. |
| itemsPerPage | number | — | Items per page. |
| currentPage | number | — | Current page number. |
| onPageChange | (page:number)=>void | — | Callback when page changes. |
| showCount | boolean | true | Show "Showing X-Y of Z" text. |
| ...PaginationProps | MUI PaginationProps | — | Additional MUI Pagination props. |

**Example:**

```tsx
<DataPagination
	totalItems={100}
	itemsPerPage={10}
	currentPage={1}
	onPageChange={setPage}
/>
```

---

## ErrorComponent

**Description:**
Displays an error message with optional retry button.

**Props:**
| Name | Type | Default | Description |
|-----------|--------------|------------------------|------------------------------|
| message | string | 'Something went wrong' | Error message to display. |
| onRetry | () => void | — | Callback for retry button. |
| retryText | string | 'Try again' | Text for retry button. |

**Example:**

```tsx
<ErrorComponent message='Failed to load data' onRetry={fetchData} />
```

---

## FeedbackContent

**Description:**
Shows a feedback message with icon, title, and message. Useful for success, error, info, or warning states.

**Props:**
| Name | Type | Default | Description |
|---------|--------------------------------------|---------|------------------------------|
| type | 'success'\|'error'\|'warning'\|'info' | — | Type of feedback. |
| title | string | — | Title text. |
| message | string | — | Main message. |
| icon | ReactNode | — | Custom icon (optional). |

**Example:**

```tsx
<FeedbackContent
	type='success'
	title='Success!'
	message='Your action was successful.'
/>
```

---

## Filter

**Description:**
Dropdown filter component for selecting from a list of options.

**Props:**
| Name | Type | Default | Description |
|-------------|-----------------------------|-------------------|------------------------------|
| options | {value:string,label:string}[]| — | List of filter options. |
| value | string | — | Selected value. |
| onChange | (value:string)=>void | — | Callback on selection. |
| label | string | 'Filter' | Input label. |
| placeholder | string | 'Select an option'| Placeholder text. |
| disabled | boolean | false | Disable the filter. |

**Example:**

```tsx
<Filter options={[{ value: 'a', label: 'A' }]} value='a' onChange={setValue} />
```

---

## GroupedAvatar

**Description:**
Displays a group of avatars, with overflow handling.

**Props:**
| Name | Type | Default | Description |
|---------|----------------------------------------------|-----------|------------------------------|
| avatars | {src?:string,alt:string,sx?:AvatarProps['sx']}[] | — | List of avatar objects. |
| max | number | 4 | Max avatars to display. |
| size | 'small'\|'medium'\|'large' | 'medium' | Avatar size. |
| spacing | number | -0.5 | Spacing between avatars. |
| variant | 'circular'\|'rounded'\|'square' | 'circular'| Avatar shape. |

**Example:**

```tsx
<GroupedAvatar avatars={[{ src: '...', alt: 'User' }]} />
```

---

## LoaderComponent

**Description:**
Centered circular progress indicator.

**Props:**
| Name | Type | Default | Description |
|-----------|-----------------------------|-----------|------------------------------|
| size | number | 40 | Size of the loader. |
| color | 'primary'\|'secondary'\|'inherit' | 'primary' | Loader color. |
| thickness | number | 3.6 | Thickness of the loader. |
| ...BoxProps| MUI BoxProps | — | Additional Box props. |

**Example:**

```tsx
<LoaderComponent size={60} color='secondary' />
```

---

## PageHeader

**Description:**
Flexible page header with title, subtitle, icon, actions, and variants.

**Props:**
| Name | Type | Default | Description |
|----------------|----------------------------------------|-----------|------------------------------|
| title | string\|ReactNode | — | Main title. |
| subtitle | string\|ReactNode | — | Subtitle. |
| rightContent | ReactNode | — | Content on the right. |
| variant | 'default'\|'compact'\|'detailed'\|'custom' | 'default'| Style variant. |
| actions | ReactNode | — | Action buttons/components. |
| icon | ReactNode | — | Icon before title. |
| backgroundColor| string | — | Background color. |
| sx | SxProps<Theme> | — | Style overrides. |
| loading | boolean | false | Show loading skeletons. |

**Example:**

```tsx
<PageHeader title='Dashboard' subtitle='Overview' icon={<DashboardIcon />} />
```

---

## PasswordStrengthBar

**Description:**
Shows a password strength meter with feedback.

**Props:**
| Name | Type | Default | Description |
|-----------|----------|---------|------------------------------|
| password | string | — | Password to evaluate. |
| minLength | number | 8 | Minimum password length. |

**Example:**

```tsx
<PasswordStrengthBar password={password} />
```

---

## TabsComponent

**Description:**
Tabbed navigation with content panels.

**Props:**
| Name | Type | Default | Description |
|---------|----------------------------------------------|---------|------------------------------|
| tabs | {label:string,content:ReactNode,icon?,disabled?}[] | — | List of tabs. |
| onChange| (index:number)=>void | — | Callback on tab change. |
| ...TabsProps | MUI TabsProps | — | Additional Tabs props. |

**Example:**

```tsx
<TabsComponent tabs={[{ label: 'Tab 1', content: <div>1</div> }]} />
```

---

## ViewPort

**Description:**
Responsive container for page content.

**Props:**
| Name | Type | Default | Description |
|-----------|--------------------------------------|-----------|------------------------------|
| children | ReactNode | — | Content to display. |
| maxWidth | 'xs'\|'sm'\|'md'\|'lg'\|'xl' | 'lg' | Max width of container. |
| centered | boolean | true | Center the content. |
| ...BoxProps| MUI BoxProps | — | Additional Box props. |

**Example:**

```tsx
<ViewPort maxWidth='md'>Content</ViewPort>
```

---

## Table

**Description:**
A flexible, typed table component with sorting and custom cell rendering. Useful for displaying tabular data.

**Props:**
| Name | Type | Default | Description |
|--------------|----------------------------------------|---------|------------------------------------|
| columns | Column<T>[] | — | Array of column definitions. |
| data | T[] | — | Array of row data. |
| order | 'asc'\|'desc' | 'asc' | Sort order. |
| orderBy | keyof T | — | Column to sort by. |
| onRequestSort| (property:keyof T)=>void | — | Callback for sort requests. |
| emptyMessage | string | 'No data available' | Message when no data. |

**Example:**

```tsx
<Table
	columns={[
		{ id: 'name', label: 'Name' },
		{ id: 'age', label: 'Age' },
	]}
	data={[{ name: 'Alice', age: 30 }]}
/>
```

---

## ActivityCard

**Description:**
Displays a list of recent activities or alerts in card format. Supports custom rendering, skeleton loading, and view-all actions.

**Props:**
| Name | Type | Default | Description |
|--------------|----------------------------------------|-----------|------------------------------------|
| title | string | 'Recent Activity' | Card title. |
| subtitle | string | — | Card subtitle. |
| items | ActivityItem[] | — | List of activity items. |
| variant | 'cards'\|'alerts'\|'custom' | 'cards' | Display style. |
| renderItem | (item:ActivityItem)=>ReactNode | — | Custom item renderer. |
| viewAllLink | string | — | URL for "View All". |
| onViewAllClick| ()=>void | — | Callback for "View All". |
| maxItems | number | 5 | Max items to display. |
| sx | SxProps<Theme> | — | Style overrides. |
| loading | boolean | false | Show loading skeletons. |

**Example:**

```tsx
<ActivityCard items={[{ id: 1, title: 'Logged in' }]} />
```

---

## AmenityCard

**Description:**
Displays a grid of property amenities, each with icon, title, and status.

**Props:**
| Name | Type | Default | Description |
|----------|---------------------|---------------------|------------------------------|
| title | string | 'Property Amenities'| Card title. |
| items | AmenityItem[] | — | List of amenities. |
| spacing | number | 3 | Grid spacing. |
| sx | SxProps<Theme> | — | Style overrides. |

**Example:**

```tsx
<AmenityCard
	items={[{ id: 1, icon: <WifiIcon />, title: 'WiFi', available: true }]}
/>
```

---

## PageDetail

**Description:**
A detailed view for entities (tenant, lease, property) with header, sections, and optional tabs. Highly customizable.

**Props:**
| Name | Type | Default | Description |
|--------------|----------------------------------------|-----------|------------------------------------|
| variant | 'tenant-detail'\|'lease-detail'\|'property-detail' | — | Type of detail view. |
| headerData | PageDetailHeaderData | — | Header info (avatar, name, etc). |
| detailSections| DetailSection[] | — | Sections (info cards, docs, etc). |
| showTabs | boolean | true | Show tabs. |
| tabs | TabInfo[] | — | Custom tabs. |
| onClose | ()=>void | — | Close callback. |
| loading | boolean | false | Show loading skeleton. |
| displayMode | 'container'\|'modal' | 'modal' | Display as modal or container. |
| position | 'left'\|'right' | 'right' | Modal position. |

**Example:**

```tsx
<PageDetail
	variant='tenant-detail'
	headerData={{ name: 'John', avatar: [] }}
	detailSections={[]}
/>
```

---

## DocumentList

**Description:**
Displays a list of documents with download actions.

**Props:**
| Name | Type | Default | Description |
|----------|---------------------|---------|------------------------------|
| title | string | — | List title. |
| items | DocumentListItem[] | — | List of documents. |
| elevation| number | 0 | Card elevation. |

**Example:**

```tsx
<DocumentList
	title='Files'
	items={[
		{ id: 1, name: 'Lease.pdf', addedDate: '2023-01-01', onDownload: () => {} },
	]}
/>
```

---

## InfoCard

**Description:**
Displays a list of labeled values, optionally with icons, in a card.

**Props:**
| Name | Type | Default | Description |
|----------|---------------------|---------|------------------------------|
| title | string | — | Card title. |
| items | InfoCardItem[] | — | List of info items. |
| elevation| number | 0 | Card elevation. |

**Example:**

```tsx
<InfoCard
	title='Tenant Info'
	items={[{ id: 1, label: 'Email', value: 'a@b.com' }]}
/>
```

---

## SavedPaymentCard

**Description:**
Displays a saved payment method (credit card) with brand, last4, and edit action.

**Props:**
| Name | Type | Default | Description |
|-----------|---------------------|-----------|------------------------------|
| last4 | string | — | Last 4 digits of card. |
| brand | string | — | Card brand. |
| isPrimary | boolean | false | Is this the primary card? |
| onEdit | ()=>void | — | Edit callback. |
| variant | 'default'\|'compact'| 'default' | Card style. |
| children | ReactNode | — | Extra content. |

**Example:**

```tsx
<SavedPaymentCard last4='1234' brand='Visa' isPrimary onEdit={() => {}} />
```

---

## DynamicAvatar

**Description:**
Displays one or more avatars, with support for grouping, initials, and custom sizes.

**Props:**
| Name | Type | Default | Description |
|-------------|---------------------|-----------|------------------------------|
| items | AvatarItem[] | — | List of avatar items. |
| maxDisplayed| number | 3 | Max avatars to show in group.|
| spacing | 'small'\|'medium'\|number | 'medium' | Spacing between avatars. |
| size | 'small'\|'medium'\|'large'| 'medium' | Avatar size. |
| showTotal | boolean | true | Show total count. |
| showName | boolean | true | Show name below avatar. |

**Example:**

```tsx
<DynamicAvatar items={[{ id: 1, name: 'Jane' }]} />
```

---

## DynamicBreadcrumb

**Description:**
Auto-generates breadcrumbs from the current path and a route map. Supports custom icons and navigation.

**Props:**
| Name | Type | Default | Description |
|-------------------|---------------------|-----------|------------------------------|
| currentPath | string | — | Current URL path. |
| routeMap | RouteMap | — | Map of route configs. |
| onNavigate | (path:string)=>void | — | Callback on breadcrumb click.|
| sx | object | — | Style overrides. |
| separator | ReactNode | <NavigateNext/> | Breadcrumb separator. |
| maxItems | number | 8 | Max breadcrumbs to show. |
| itemsBeforeCollapse| number | 1 | Items before collapse. |
| itemsAfterCollapse| number | 1 | Items after collapse. |

**Example:**

```tsx
<DynamicBreadcrumb
	currentPath='/dashboard/settings'
	routeMap={{ '/dashboard': { slug: 'Dashboard' } }}
/>
```

---

## ErrorBoundary

**Description:**
Catches JavaScript errors in child components and displays a fallback UI.

**Props:**
| Name | Type | Default | Description |
|-----------|-------------|---------|------------------------------|
| children | ReactNode | — | Child components. |
| fallback | ReactNode | — | Custom fallback UI. |

**Example:**

```tsx
<ErrorBoundary>
	<MyComponent />
</ErrorBoundary>
```

---

## DynamicModal

**Description:**
Highly customizable modal dialog with header, content, actions, and responsive design.

**Props:**
| Name | Type | Default | Description |
|--------------|---------------------|-----------|------------------------------|
| open | boolean | — | Open/close state. |
| onClose | ()=>void | — | Close callback. |
| header | ReactNode | — | Custom header. |
| headerText | string | — | Header text. |
| subHeader | ReactNode | — | Sub-header text. |
| headerAlign | 'left'\|'center'\|'right' | 'left' | Header alignment. |
| children | ReactNode | — | Modal content. |
| contentAlign | 'left'\|'center'\|'right' | 'left' | Content alignment. |
| contentDirection| 'row'\|'column' | 'column' | Content flex direction. |
| footer | ReactNode | — | Custom footer. |
| actions | ModalAction[] | — | Action buttons. |
| footerAlign | 'left'\|'center'\|'right' | 'right'| Footer alignment. |
| borderRadius | number\|string | 16 | Border radius. |
| maxWidth | 'xs'\|'sm'\|'md'\|'lg'\|'xl'\|false | 'md' | Max width. |
| fullScreenOnMobile| boolean | true | Fullscreen on mobile. |
| sx | object | — | Style overrides. |

**Example:**

```tsx
<DynamicModal open={open} onClose={handleClose} headerText='Title'>
	<div>Modal content</div>
</DynamicModal>
```

---
