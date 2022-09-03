package org.egov.filemgmnt.archunit;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.core.importer.Location;

import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.ParameterContext;
import org.junit.jupiter.api.extension.ParameterResolutionException;
import org.junit.jupiter.api.extension.ParameterResolver;
import org.junit.jupiter.params.provider.Arguments;

import java.util.stream.Stream;

class JavaClassesResolver implements ParameterResolver {

    private static JavaClasses javaClasses;

    static {
        javaClasses = new ClassFileImporter()//
                                             .withImportOption(new ImportOption() {
                                                 @Override
                                                 public boolean includes(Location location) {
                                                     return !location.contains("/test-classes/");
                                                 }
                                             })//
                                             .importPackages("org.egov.filemgmnt");
    }

    @Override
    public boolean supportsParameter(ParameterContext parameterContext,
            ExtensionContext extensionContext) throws ParameterResolutionException {
        return parameterContext.getParameter().getType() == JavaClasses.class;
    }

    @Override
    public Object resolveParameter(ParameterContext parameterContext,
            ExtensionContext extensionContext) throws ParameterResolutionException {
        return javaClasses;
    }

    // for parameterized test
    static Stream<Arguments> javaClassFiles() {
        return Stream.of(Arguments.of(javaClasses));
    }
}
