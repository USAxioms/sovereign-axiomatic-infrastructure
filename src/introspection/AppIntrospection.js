import { IntrospectionEngine } from '@/engine/IntrospectionEngine.js'
import { Modules } from '@/modules/AppModules.js'
import { Plugins } from '@/plugins/AppPlugins.js'
import { Resources } from '@/resources/AppResources.js'
import { TelemetryLayer } from '@/telemetry/AppTelemetry.js'
import { Diagnostics } from '@/diagnostics/AppDiagnostics.js'
import { Packages } from '@/packages/AppPackages.js'

export const Introspect = new IntrospectionEngine({
  Modules,
  Plugins,
  Resources,
  TelemetryLayer,
  Diagnostics,
  Packages
})
